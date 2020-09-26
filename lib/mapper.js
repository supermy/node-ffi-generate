// Copyright 2011, 2012, 2013, 2014 Timothy J Fontaine <tjfontaine@gmail.com>
// Copyright 2020 Joel Purra <https://joelpurra.com/>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE

const Debug = require("debug");
const {
	normalize,
} = require("path");
const assert = require("assert");
const {
	ChildVisitResult,
	CursorKind,
	Index,
	TranslationUnit,
	TypeKind,
	libclang,
} = require("@ffi-packager/libclang");
const {
	sortBy,
} = require("lodash");

const fixVaListTag = require("./fix-va-list-tag");
const primitiveTypeMapper = require("./primitive-type-mapper");
const TypeWrapper = require("./wrappers/type-wrapper");
const matchPrefix = require("./match-prefix");
const getTypeNameFromUSR = require("./get-type-name-from-usr");

const mapper = async (options, templates) => {
	const debug = new Debug("ffi-generate:mapper");

	const toRender = {
		enums: undefined,
		functions: [],
		library: options.library,
		sorted: {
			enums: [],
			functions: [],
			types: [],
		},
		types: [],
	};

	const unmapped = [];
	const typeLookup = {};
	const enumLookup = {};

	const addType = (wrap) => {
		assert(wrap, JSON.stringify(wrap));
		assert.strictEqual(typeof wrap, "object", JSON.stringify(wrap));
		assert.strictEqual(typeof wrap.name, "string", JSON.stringify(wrap));
		assert(wrap.name.length > 0, JSON.stringify(wrap));
		assert.strictEqual(typeof wrap.renderedType, "string", JSON.stringify(wrap));
		assert(wrap.renderedType.length > 0, JSON.stringify(wrap));
		assert.strictEqual(typeof wrap.typeReference, "string", JSON.stringify(wrap));
		assert(wrap.typeReference.length > 0, JSON.stringify(wrap));

		if (typeLookup[wrap.typeReference]) {
			debug("Type already defined.", wrap.typeReference);

			return undefined;
		}

		// TODO: don't keep two copies of types/structs.
		toRender.types.push(wrap);
		typeLookup[wrap.typeReference] = wrap;
	};

	const index = new Index(true, true);
	const translationUnit = TranslationUnit.fromSource(index, options.filepath, options.compilerArgs);

	const defineAlias = function (cursor) {
		assert.strictEqual(cursor.kind, CursorKind.TypedefDecl);

		const name = cursor.spelling;

		// if (!name) {
		//     name = getTypeNameFromUSR(type.usr);
		// }

		assert.strictEqual(typeof name, "string");
		assert(name.length > 0);

		let wrap = typeLookup[name];

		if (wrap) {
			return wrap;
		}

		wrap = new TypeWrapper(name, undefined, name);

		const aliasedMappedType = mapType(cursor.typedefType);

		if (aliasedMappedType) {
			wrap.renderedType = aliasedMappedType.typeReference;
		} else if (cursor.typedefType.declaration.kind === CursorKind.NoDeclFound) {
			const aliasedUndeclaredType = defineOpaque(cursor.typedefType.declaration);
			wrap.renderedType = aliasedUndeclaredType.typeReference;
		} else {
			const aliasedDefinedType = defineType(cursor.typedefType.declaration);

			if (aliasedDefinedType) {
				wrap.renderedType = aliasedDefinedType.typeReference;
			} else {
				wrap.abort = {
					reason: "Could not map typedef.",
					self: {
						kind: {
							code: cursor.kind,
							name: libclang.constants.CXCursorKind[cursor.kind],
						},
						spelling: cursor.spelling,
						type: {
							kind: cursor.type.kind,
							spelling: cursor.type.spelling,
						},
					},
				};

				// TODO: only push to unmapped at the top level?
				unmapped.push(wrap.abort);

				return wrap;
			}
		}

		// TODO: do not both add and return type.
		addType(wrap);

		return wrap;
	};

	const defineType = function (cursor) {
		let name = cursor.spelling;

		if (!name) {
			name = getTypeNameFromUSR(cursor.usr);
		}

		assert.strictEqual(typeof name, "string", `${cursor.kind} ${libclang.constants.CXCursorKind[cursor.kind]}`);
		assert(name.length > 0);

		let wrap = typeLookup[name];

		if (wrap) {
			return wrap;
		}

		wrap = new TypeWrapper(name, undefined, name);

		const referencedVisitor = function (parent) {
			let fieldType;
			let fieldName;

			switch (this.kind) {
				case CursorKind.StructDecl:
				case CursorKind.UnionDecl:
					fieldName = this.isAnonymous ? `anonymous${wrap.anonymousCount++}` : this.spelling;
					fieldType = defineType(this);
					break;

				case CursorKind.TypeRef:
					fieldName = this.referenced.spelling;
					fieldType = mapType(this.referenced.type);
					break;

				case CursorKind.FieldDecl:
				case CursorKind.ParmDecl:
					fieldName = this.spelling;
					fieldType = mapType(this.type);
					break;

				default:
					break;
			}

			if (fieldType) {
				wrap.fields.push(new TypeWrapper(
					fieldName,
					fieldType.renderedType,
					fieldType.typeReference,
				));

				return ChildVisitResult.Continue;
			}

			wrap.abort = {
				parent: {
					kind: {
						code: parent.kind,
						name: libclang.constants.CXCursorKind[parent.kind],
					},
					spelling: parent.spelling,
					type: {
						kind: parent.type.kind,
						spelling: parent.type.spelling,
					},
				},
				reason: "Could not map inner type.",
				self: {
					kind: {
						code: this.kind,
						name: libclang.constants.CXCursorKind[this.kind],
					},
					spelling: this.spelling,
					type: {
						kind: this.type.kind,
						spelling: this.type.spelling,
					},
				},
			};

			// TODO: only push to unmapped at the top level?
			unmapped.push(wrap.abort);

			return ChildVisitResult.Break;
		};

		cursor.referenced.canonical.visitChildren(referencedVisitor);

		if (!wrap.abort) {
			switch (cursor.kind) {
				case CursorKind.UnionDecl: {
					if (wrap.fields.length === 0) {
						// TODO: avoid special case.
						const opaqueTypeForEmptyUnion = defineOpaque(cursor);
						wrap.renderedType = opaqueTypeForEmptyUnion.typeReference;
						wrap.opaque = true;
					} else {
						wrap.renderedType = templates.Union.render(wrap);
						wrap.kind = "union";
					}

					break;
				}

				case CursorKind.StructDecl: {
					if (wrap.fields.length === 0) {
						// TODO: avoid special case.
						const opaqueTypeForEmptyStruct = defineOpaque(cursor);
						wrap.renderedType = opaqueTypeForEmptyStruct.typeReference;
						wrap.opaque = true;
					} else {
						wrap.renderedType = templates.Struct.render(wrap);
						wrap.kind = "struct";
					}

					break;
				}

				default: {
					wrap.abort = {
						kind: {
							code: cursor.kind,
							name: libclang.constants.CXCursorKind[cursor.kind],
						},
						reason: "Unknown type definition kind.",
						spelling: cursor.spelling,
						type: {
							kind: cursor.type.kind,
							spelling: cursor.type.spelling,
						},
					};

					// TODO: only push to unmapped at the top level?
					unmapped.push(wrap.abort);

					break;
				}
			}

			if (!wrap.abort) {
				// TODO: do not both add and return type.
				addType(wrap);
			}
		}

		return wrap;
	};

	const mapEnum = (enumType, enumValueType) => {
		function mapEnumVisitor(parent) {
			const value = (enumValueType.name[0] === "u") ? this.enumUValue : this.enumValue;

			// NOTE: getting segfaults when (?) referencing spelling multiple times.
			let enumName = parent.spelling;

			if (enumName === "") {
				enumName = getTypeNameFromUSR(parent.usr);
			}

			const enumPropertyName = this.spelling;

			let enumObject = enumLookup[enumName];

			if (!enumObject) {
				enumObject = {};
				enumLookup[enumName] = enumObject;
			}

			enumObject[enumPropertyName] = value;

			return ChildVisitResult.Continue;
		}

		enumType.referenced.canonical.visitChildren(mapEnumVisitor);
	};

	function definePrimitiveType(primitiveType) {
		const primitiveTypeWrapper = new TypeWrapper(
			`[[${primitiveType}]]`,
			primitiveType,
			`js_${primitiveType.replace("ref.types.", "")}`,
		);

		// TODO: do not both add and return type.
		addType(primitiveTypeWrapper);

		return primitiveTypeWrapper;
	}

	const definePrimitiveTypePointer = (primitiveType) => {
		definePrimitiveType(primitiveType);

		const primitiveTypePointerWrapper = new TypeWrapper(
			`[[ref.refType(${primitiveType})]]`,
			`ref.refType(js_${primitiveType.replace("ref.types.", "")})`,
			`js_${primitiveType.replace("ref.types.", "")}Pointer`,
		);

		// TODO: do not both add and return type.
		addType(primitiveTypePointerWrapper);

		return primitiveTypePointerWrapper;
	};

	const defineOpaque = (cursor) => {
		definePrimitiveTypePointer("ref.types.void");

		// TODO: reconsider the static opaque template.
		const opaqueType = new TypeWrapper(
			`[[${cursor.spelling}]]`,
			"ref.refType(js_void)",
			"js_voidPointer",
		);
		opaqueType.opaque = true;

		// TODO: do not both add and return type.
		addType(opaqueType);

		return opaqueType;
	};

	const defineFunction = (functionName, functionType) => {
		// TODO: work on the function (declaration) cursor instead of function type?
		// TODO: create FunctionWrapper with return type, arguments.
		const functionTypeWrapper = new TypeWrapper(functionName, undefined, functionName);
		const functionReturnType = mapType(functionType.result);

		if (!functionReturnType) {
			functionTypeWrapper.abort = {
				arg: functionType.result.spelling,
				kind: functionType.declaration.spelling,
				name: functionName,
				reason: "Could not map function return type.",
			};

			return functionTypeWrapper;
		}

		functionTypeWrapper.returnType = functionReturnType;

		for (let i = 0; i < functionType.numberOfArguments; i++) {
			const functionArgument = functionType.getArgument(i);
			const functionArgumentType = mapType(functionArgument);

			if (!functionArgumentType) {
				functionTypeWrapper.abort = {
					arg: functionArgument.spelling,
					displayName: functionArgument.declaration.displayName,
					name: functionName,
					position: i,
					reason: "Could not map function argument type.",
				};

				return functionTypeWrapper;
			}

			functionTypeWrapper.args.push(functionArgumentType);
		}

		return functionTypeWrapper;
	};

	const mapType = function (type) {
		assert(type.kind !== 0);

		switch (type.kind) {
			case TypeKind.Typedef: {
				if (type.canonical.kind === TypeKind.Pointer && type.canonical.pointeeType.kind === TypeKind.FunctionProto) {
					const mappedType = defineFunction(type.declaration.spelling, type.canonical.pointeeType);

					if (mappedType.abort) {
						// TODO: only push to unmapped at the top level?
						unmapped.push(mappedType.abort);

						return undefined;
					}

					mappedType.renderedType = templates.Function.render(mappedType);

					// TODO: do not both add and return type.
					addType(mappedType);

					return mappedType;
				}

				// return defineOpaque(type.declaration);

				// const mappedType = mapType(type.canonical);
				//
				// if (mappedType) {
				//     return mappedType;
				// }

				return defineAlias(type.declaration);
			}

			case TypeKind.Enum: {
				const mappedType = mapType(type.declaration.enumType);
				mapEnum(type.declaration, mappedType);

				return mappedType;
			}

			case TypeKind.Pointer: {
				if (type.pointeeType.kind === TypeKind.Char_S) {
					const cstringTypeWrapper = new TypeWrapper(
						"[[ref.types.CString]]",
						"ref.types.CString",
						"js_CString",
					);

					// TODO: do not both add and return type.
					addType(cstringTypeWrapper);

					return cstringTypeWrapper;
				}

				if (type.pointeeType.declaration.kind === CursorKind.TypedefDecl) {
					const mappedType = defineAlias(type.pointeeType.declaration);

					if (mappedType) {
						const mappedTypePointerWrapper = new TypeWrapper(
							`[[${mappedType.name}Pointer]]`,
							`ref.refType(${mappedType.typeReference})`,
							`${mappedType.typeReference}Pointer`,
						);

						// TODO: do not both add and return type.
						addType(mappedTypePointerWrapper);

						return mappedTypePointerWrapper;
					}
				}

				const primitiveType = primitiveTypeMapper(type.pointeeType.canonical.kind);

				if (primitiveType) {
					return definePrimitiveTypePointer(primitiveType);
				}

				return defineOpaque(type.pointeeType.declaration);
			}

			case TypeKind.ConstantArray: {
				const arrayElementType = mapType(type.elementType);
				const arrayType = new TypeWrapper(`[[${arrayElementType.name}[${type.arraySize}]]]`);

				arrayType.elementType = arrayElementType;
				arrayType.arrSize = type.arraySize;
				arrayType.renderedType = templates.Array.render(arrayType);
				arrayType.typeReference = `${arrayElementType.typeReference}_array_${type.arraySize}`;

				// TODO: do not both add and return type.
				addType(arrayType);

				return arrayType;
			}

			case TypeKind.Record:
				return defineType(type.declaration);

			case TypeKind.Elaborated:
				return mapType(type.namedType);

			default:
			{
				const primitiveType = primitiveTypeMapper(type.kind);

				if (primitiveType) {
					return definePrimitiveType(primitiveType, addType);
				}

				break;
			}
		}

		debug("Unexpected unhandled case.", type.spelling, type.kind.spelling);

		return undefined;
	};

	const topLevelVisitor = function (_parent) {
		if (!matchPrefix(options.prefixes, this.spelling)) {
			return ChildVisitResult.Continue;
		}

		if (options.singleFile && normalize(this.location.presumedLocation.filename) !== options.filepath) {
			return ChildVisitResult.Continue;
		}

		switch (this.kind) {
			case CursorKind.FunctionDecl: {
				if (this.isInlined) {
					break;
				}

				const functionType = defineFunction(this.spelling, this.type);

				if (functionType.abort) {
					unmapped.push(functionType.abort);
				} else {
					toRender.functions.push(functionType);
				}

				break;
			}

			case CursorKind.EnumDecl: {
				const enumValueType = mapType(this);

				if (enumValueType.abort) {
					unmapped.push(enumValueType.abort);
				} else {
					mapEnum(this, enumValueType);
				}

				break;
			}

			default:
				break;
		}

		return ChildVisitResult.Continue;
	};

	translationUnit.cursor.canonical.visitChildren(topLevelVisitor);

	translationUnit.dispose();
	index.dispose();

	await fixVaListTag(templates, toRender);

	toRender.enums = Object.entries(enumLookup).map(([
		enumDefinition,
		enumMaps,
	]) => ({
		name: enumDefinition,
		values: Object.entries(enumMaps).map(([
			enumName,
			enumValue,
		]) =>
			({
				name: enumName,
				value: enumValue,
			}),
		),
	}));

	toRender.sorted.enums = sortBy(toRender.enums, [
		"name",
	]);
	toRender.sorted.functions = sortBy(toRender.functions, [
		"name",
	]);
	toRender.sorted.types = sortBy(toRender.types, [
		"typeReference",
	]);

	const result = {
		toRender,
		unmapped,
	};

	return result;
};

module.exports = mapper;
