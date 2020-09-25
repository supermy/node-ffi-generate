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
		if (typeLookup[wrap.name]) {
			debug("Type already defined.", wrap.name);

			return undefined;
		}

		// TODO: don't keep two copies of types/structs.
		toRender.types.push(wrap);
		typeLookup[wrap.name] = wrap;
	};

	const getFallbackOpaquePointerType = () => {
		const fallbackOpaquePointerType = new TypeWrapper("voidPtr");
		fallbackOpaquePointerType.opaque = true;
		fallbackOpaquePointerType.type = templates.Opaque.render({});

		return fallbackOpaquePointerType;
	};

	const index = new Index(true, true);
	const translationUnit = TranslationUnit.fromSource(index, options.filepath, options.compilerArgs);

	const defineType = function (type) {
		let name = type.spelling;

		if (!name) {
			name = getTypeNameFromUSR(type.usr);
		}

		if (!name) {
			return undefined;
		}

		let wrap = typeLookup[name];

		if (wrap) {
			return wrap;
		}

		wrap = new TypeWrapper(name);

		const referencedVisitor = function (parent) {
			let innerType;
			let innerTypeName;

			if (this.kind === CursorKind.StructDecl || this.kind === CursorKind.UnionDecl) {
				innerTypeName = this.isAnonymous ? `anonymous${wrap.anonymousCount++}` : this.spelling;
				innerType = defineType(this, innerTypeName);
			} else if (this.kind === CursorKind.TypeRef) {
				innerTypeName = this.referenced.spelling;
				innerType = mapType(this.referenced.type);
			} else if (this.kind === CursorKind.FieldDecl || this.kind === CursorKind.ParmDecl) {
				innerTypeName = this.spelling;
				innerType = mapType(this.type);
			}

			if (innerType) {
				wrap.fields.push({
					name: innerTypeName,
					type: ([
						"struct",
						"union",
					].includes(innerType.kind) ? innerType.name : (innerType.type || innerType.name)),
				});

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

		type.referenced.canonical.visitChildren(referencedVisitor);

		if (!wrap.abort) {
			switch (type.kind) {
				case CursorKind.UnionDecl: {
					if (wrap.fields.length === 0) {
						// TODO: avoid special case.
						wrap.type = templates.Opaque.render({});
						wrap.opaque = true;
					} else {
						wrap.type = templates.Union.render(wrap);
						wrap.kind = "union";
					}

					break;
				}

				case CursorKind.TypedefDecl:
				case CursorKind.StructDecl: {
					if (wrap.fields.length === 0) {
						// TODO: avoid special case.
						wrap.type = templates.Opaque.render({});
						wrap.opaque = true;
					} else {
						wrap.type = templates.Struct.render(wrap);
						wrap.kind = "struct";
					}

					break;
				}

				default: {
					wrap.abort = {
						reason: "Unknown type definition kind.",
						self: {
							kind: {
								code: type.kind,
								name: libclang.constants.CXCursorKind[type.kind],
							},
							spelling: type.spelling,
							type: {
								kind: type.type.kind,
								spelling: type.type.spelling,
							},
						},
					};

					// TODO: only push to unmapped at the top level?
					unmapped.push(wrap.abort);

					break;
				}
			}

			// TODO: do not both add and return type.
			addType(wrap);
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

	const defineOpaque = (declaration) => {
		const opaqueType = new TypeWrapper(declaration.spelling);
		opaqueType.opaque = true;
		opaqueType.type = templates.Opaque.render(opaqueType);

		// TODO: do not both add and return type.
		addType(opaqueType);

		return opaqueType;
	};

	const defineFunction = (functionName, returnType) => {
		const functionType = new TypeWrapper(functionName);
		const functionReturnType = mapType(returnType.result);

		if (!functionReturnType) {
			functionType.abort = {
				arg: returnType.result.spelling,
				kind: returnType.declaration.spelling,
				name: functionName,
				reason: "Could not map function return type.",
			};

			return functionType;
		}

		functionType.returnType = functionReturnType.name;

		for (let i = 0; i < returnType.argTypes; i++) {
			const functionArgument = returnType.getArg(i);
			const functionArgumentType = mapType(functionArgument);

			if (!functionArgumentType) {
				functionType.abort = {
					arg: functionArgument.spelling,
					displayname: functionArgument.declaration.displayname,
					name: functionName,
					position: i,
					reason: "Could not map function argument type.",
				};

				return functionType;
			}

			functionType.args.push(functionArgumentType);
		}

		return functionType;
	};

	const mapType = function (type) {
		assert(type.kind !== 0);

		switch (type.kind) {
			case TypeKind.Typedef: {
				if (type.canonical.kind === TypeKind.Pointer) {
					if (type.canonical.pointeeType.kind === TypeKind.FunctionProto) {
						const mappedType = defineFunction(type.declaration.spelling, type.canonical.pointeeType);

						if (mappedType.abort) {
							// TODO: only push to unmapped at the top level?
							unmapped.push(mappedType.abort);

							return undefined;
						}

						mappedType.type = templates.FuncPtr.render(mappedType);

						// TODO: do not both add and return type.
						addType(mappedType);

						return mappedType;
					}

					return defineOpaque(type.declaration);
				}

				const mappedType = mapType(type.canonical);

				if (mappedType) {
					return mappedType;
				}

				return defineType(type.declaration);
			}

			case TypeKind.Enum: {
				const mappedType = mapType(type.declaration.enumType);
				mapEnum(type.declaration, mappedType);

				return mappedType;
			}

			case TypeKind.Pointer: {
				if (type.pointeeType.kind === TypeKind.Char_S) {
					return new TypeWrapper("ref.types.CString");
				}

				if (type.pointeeType.declaration.kind === CursorKind.TypedefDecl) {
					const mappedType = defineType(type.pointeeType.declaration);

					if (mappedType) {
						return new TypeWrapper(mappedType.name + "Ptr");
					}
				}

				const mappedPrimitiveType = primitiveTypeMapper(type.pointeeType.canonical.kind);

				if (mappedPrimitiveType && mappedPrimitiveType !== "ref.types.void") {
					return new TypeWrapper("ref.refType(" + mappedPrimitiveType + ")");
				}

				return getFallbackOpaquePointerType();
			}

			case TypeKind.ConstantArray: {
				let mappedType = mapType(type.elementType);

				if (!mappedType) {
					mappedType = defineType(type.elementType.declaration);
				}

				mappedType.arrSize = type.arraySize;
				mappedType.type = templates.Array.render(mappedType);

				return mappedType;
			}

			case TypeKind.Record:
				return defineType(type.declaration);

			case TypeKind.Elaborated:
				return mapType(type.namedType);

			default:
			{
				const mappedPrimitiveType = primitiveTypeMapper(type.kind);

				if (mappedPrimitiveType) {
					return new TypeWrapper(mappedPrimitiveType);
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

	await fixVaListTag(toRender);

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
		"name",
	]);

	const result = {
		toRender,
		unmapped,
	};

	return result;
};

module.exports = mapper;
