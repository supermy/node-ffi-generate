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
const typeMapper = require("./type-map");
const WrapType = require("./wrap-type");
const matchPrefix = require("./match-prefix");
const getTypeNameFromUSR = require("./get-type-name-from-usr");

const mapper = async (options, templates) => {
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
	const structs = {};
	const enums = {};

	const addType = (wrap) => {
		if (structs[wrap.name]) {
			// eslint-disable-next-line no-console
			console.warn("Type already defined.", wrap.name);

			return undefined;
		}

		// TODO: don't keep two copies of types/structs.
		toRender.types.push(wrap);
		structs[wrap.name] = wrap;
	};

	const idx = new Index(true, true);

	const tu = TranslationUnit.fromSource(idx, options.filepath, options.compilerArgs);
	const curs = tu.cursor;

	/* For a given Typedef try and iterate fields and define an FFI struct */
	const defineType = function (type) {
		let name = type.spelling;

		if (!name) {
			// TODO XXX FIXME we probably have a record here and are hacking our way to find out its name.
			name = getTypeNameFromUSR(type.usr);
		}

		if (!name) {
			return undefined;
		}

		let wrap = structs[name];

		if (wrap) {
			return wrap;
		}

		wrap = new WrapType(name);

		const referencedVisitor = function (parent) {
			let innerType;
			let innerTypeName;

			if (this.kind === CursorKind.StructDecl || this.kind === CursorKind.UnionDecl) {
				innerTypeName = this.isAnonymous ? `anonymous${wrap.anonymousCount++}` : this.spelling;
				innerType = defineType(this, innerTypeName);
			} else if (this.kind === CursorKind.TypeRef) {
				innerTypeName = this.referenced.spelling;
				innerType = mapType(this.referenced.type, innerTypeName);
			} else if (this.kind === CursorKind.FieldDecl || this.kind === CursorKind.ParmDecl) {
				innerTypeName = this.spelling;
				innerType = mapType(this.type, innerTypeName);
			}

			if (innerType) {
				/* Add the field for the struct/union */
				wrap.elements.push({
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
					if (wrap.elements.length === 0) {
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
					/* structs should probably contain at least one type, and don't claim to support partially defined types */
					if (wrap.elements.length === 0) {
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

			// NOTE: am getting segfaults when (?) referencing spelling multiple times.
			let enumName = parent.spelling;

			if (enumName === "") {
				enumName = getTypeNameFromUSR(parent.usr);
			}

			const enumPropertyName = this.spelling;

			let enumObject = enums[enumName];

			if (!enumObject) {
				enumObject = {};
				enums[enumName] = enumObject;
			}

			enumObject[enumPropertyName] = value;

			return ChildVisitResult.Continue;
		}

		enumType.referenced.canonical.visitChildren(mapEnumVisitor);
	};

	const defineOpaque = (declaration) => {
		const opaqueType = new WrapType(declaration.spelling);
		opaqueType.opaque = true;
		opaqueType.type = templates.Opaque.render(opaqueType);

		// TODO: do not both add and return type.
		addType(opaqueType);

		return opaqueType;
	};

	const defineFunction = (functionName, returnType) => {
		const functionType = new WrapType(functionName);
		const functionReturnType = mapType(returnType.result, functionName);

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
			const functionArgumentType = mapType(functionArgument, functionName + "-arg" + i);

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

	/*
		Turn the libclang type into ffi type
	*/
	const mapType = function (type) {
		assert(type.kind !== 0);

		switch (type.kind) {
			case TypeKind.Typedef: {
				/* Handle the case where someone has simply redefined an existing type */
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

				/* If this is a struct try and create */
				return defineType(type.declaration);
			}

			case TypeKind.Enum: {
				const mappedType = mapType(type.declaration.enumType);
				mapEnum(type.declaration, mappedType);

				return mappedType;
			}

			case TypeKind.Pointer: {
				if (type.pointeeType.kind === TypeKind.Char_S) {
					return new WrapType("ref.types.CString");
				}

				if (type.pointeeType.declaration.kind === CursorKind.TypedefDecl) {
					const mappedType = defineType(type.pointeeType.declaration);

					if (mappedType) {
						return new WrapType(mappedType.name + "Ptr");
					}

					if (type.pointeeType.declaration) {
						return defineOpaque(type.pointeeType.declaration);
					}
				}

				const mappedType = typeMapper(type.pointeeType.canonical.kind);

				if (mappedType && mappedType !== "ref.types.void") {
					return new WrapType("ref.refType(" + mappedType + ")");
				}

				const fallbackOpaquePointerType = new WrapType("voidPtr");
				fallbackOpaquePointerType.opaque = true;
				fallbackOpaquePointerType.type = templates.Opaque.render({});

				return fallbackOpaquePointerType;
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
				const mappedType = typeMapper(type.kind);

				if (mappedType) {
					return new WrapType(mappedType);
				}

				break;
			}
		}

		// eslint-disable-next-line no-console
		console.warn("Unexpected unhandled case.", type.spelling, type.kind.spelling);

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
				const enumValueType = mapType(this, this.spelling);

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

	curs.canonical.visitChildren(topLevelVisitor);

	tu.dispose();
	idx.dispose();

	await fixVaListTag(toRender);

	toRender.enums = Object.entries(enums).map(([
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
