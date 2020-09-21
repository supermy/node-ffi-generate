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
	const defineType = function (type, unionName) {
		/* We've previously defined this type
		* TODO XXX FIXME? wanted to use type.usr since it's relevant per translation unit
		* but using just the regular spelling makes things nicer for accessibility
		*/
		let name = type.spelling;

		if (!name && unionName) {
			name = unionName;
		}

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

		const referencedVisitor = function (_parent) {
			if (this.kind === CursorKind.StructDecl) {
				return ChildVisitResult.Recurse;
			}

			if (this.kind === CursorKind.UnionDecl) {
				const innerUnionName = this.type.declaration.spelling || "union" + wrap.unionCount++;
				const unionType = defineType(this.type.declaration, innerUnionName);

				if (unionType) {
					unionType.kind = "union";
					wrap.elements.push(unionType);
				} else {
					return ChildVisitResult.Continue;
				}
			}

			/* TODO XXX FIXME?
			* If the current position of the cursor has an empty string, we're
			* probably still at the start of the struct/typedef
			*/
			if (this.spelling) {
				let innerType;
				let innerTypeName;

				/* Potentially some recursion here -- if this type depends on a type
				* a type we have yet to define this call should recurse until we're
				* in a sane state -- undefined if we can't map the type.
				*/
				if (this.kind === CursorKind.TypeRef) {
					innerType = mapType(this.referenced.type, this.referenced.spelling);
					innerTypeName = this.referenced.spelling;
				} else if (this.kind === CursorKind.UnexposedDecl) {
					innerType = mapType(this.type, this.type.spelling);
					innerTypeName = this.type.spelling;
				} else if (this.kind === CursorKind.FieldDecl && this.type.kind === TypeKind.Unexposed) {
					innerType = wrap.elements[wrap.elements.length - 1];
					/* This may not be entirely correct, we're assuming that because we
					* already have elements defined that we're at the name of it,
					* consider `union { int foo; } myUnion;` but it's also possible
					* we are at an actual definition and we should be defining this type
					*
					* TODO -- man I need tests.
					*/
					if (innerType) {
						innerType.name = this.spelling;

						return ChildVisitResult.Continue;
					}

					innerType = defineType(this.type.declaration);
					innerTypeName = this.spelling;
				} else {
					innerType = mapType(this.type, this.spelling);
					innerTypeName = this.spelling;
				}

				if (innerType) {
					/* Add the field for the struct */
					wrap.elements.push({
						name: innerTypeName,
						type: (innerType.kind === "struct" ? innerType.name : innerType.type) || innerType.name,
					});

					return ChildVisitResult.Continue;
				}

				/* This type has an element we don't know how to map yet, abort */
				wrap.abort = {
					name: innerTypeName,
				};

				return ChildVisitResult.Break;
			}

			if (this.kind === CursorKind.UnexposedDecl || this.kind === CursorKind.UnexposedAttr) {
				return ChildVisitResult.Continue;
			}

			if (this.type.kind === CursorKind.BlockExpr) {
				return ChildVisitResult.Continue;
			}

			wrap.abort = {
				kind: this.type.kind,
			};

			return ChildVisitResult.Break;
		};

		type.referenced.canonical.visitChildren(referencedVisitor);

		/* types should probably contain at least one type, and don't claim to support partially defined types */
		if (!wrap.abort && wrap.elements.length > 0) {
			if (unionName) {
				wrap.type = templates.Union.render(wrap);
				wrap.kind = "union";
			} else {
				wrap.type = templates.Struct.render(wrap);
				wrap.kind = "struct";
				addType(wrap);
			}

			return wrap;
		}

		// eslint-disable-next-line no-console
		console.warn("Could not define type.", type.spelling, unionName);

		return undefined;
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

	const defineOpaque = (canonical) => {
		const opaqueType = new WrapType(canonical);
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
				position: -1,
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

		if (type.kind === TypeKind.Pointer && type.pointeeType.kind === TypeKind.Char_S) {
			return new WrapType("ref.types.CString");
		}

		switch (type.kind) {
			case TypeKind.Typedef: {
				/* Handle the case where someone has simply redefined an existing type */
				if (type.canonical.kind === TypeKind.Pointer && type.canonical.declaration.kind === CursorKind.NoDeclFound && type.declaration.spelling) {
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

					const mappedType = defineType(type.canonical.pointeeType.declaration);

					if (mappedType) {
						return new WrapType(mappedType.name + "Ptr");
					}

					return defineOpaque(type.declaration.spelling);
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
				if (type.pointeeType.declaration.kind === CursorKind.TypedefDecl) {
					const mappedType = defineType(type.pointeeType.declaration);

					if (mappedType) {
						return new WrapType(mappedType.name + "Ptr");
					}
				} else {
					let mappedType = typeMapper(type.pointeeType.canonical.kind);

					if (mappedType) {
						// TODO XXX FIXME template work
						if (mappedType === "ref.types.void") {
							mappedType = "voidPtr";
						} else {
							mappedType = "ref.refType(" + mappedType + ")";
						}

						return new WrapType(mappedType);
					}
				}

				if (type.pointeeType.declaration.kind === CursorKind.TypedefDecl && type.pointeeType.declaration.spelling) {
					return defineOpaque(type.pointeeType.declaration.spelling);
				}

				return {
					name: templates.Opaque.render({}),
					type: templates.Opaque.render({}),
				};
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
