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

const typeMapper = require("./ffi-type-map");
const WrapType = require("./wrap-type");
const matchPrefix = require("./match-prefix");

const mapper = async (options, templates) => {
	const toRender = {
		enums: [],
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
		let wrap;

		if (!name && unionName) {
			name = unionName;
		}

		if (!name && type.usr) {
			// TODO XXX FIXME we probably have a record here and are hacking our way
			// to find out its name
			name = type.usr.split("@")[2];
		}

		if (!name) {
			//// eslint-disable-next-line no-console
			//console.error(name, !name, type.spelling, type.usr);
			return undefined;
		}

		wrap = structs[name];

		if (wrap) {
			return wrap;
		}

		wrap = new WrapType(name);

		let first = true;

		const firstVisitor = function (_parent) {
			let returnValue;
			let t;
			let tname;
			/* First item in the cursor is the one we started with?
			* immediately move beyond it
			*/
			//// eslint-disable-next-line no-console
			//console.error('visiting', this.kind, this.spelling, _parent.kind, _parent.spelling);
			if (first && this.kind === CursorKind.StructDecl) {
				first = false;
				return ChildVisitResult.Recurse;
			}

			if (this.kind === CursorKind.UnionDecl) {
				const un = this.type.declaration.spelling || "union" + wrap.unionCount++;
				//// eslint-disable-next-line no-console
				//console.error('UnionDecl', un, this.kind);
				const union = defineType(this.type.declaration, un);
				if (union) {
					union.kind = "union";
					wrap.elements.push(union);
				} else {
					//// eslint-disable-next-line no-console
					//console.error('failed to wrap union');
					return ChildVisitResult.Continue;
				}
			}

			/* TODO XXX FIXME?
			* If the current position of the cursor has an empty string, we're
			* probably still at the start of the struct/typedef
			*/
			if (this.spelling) {
				/* Potentially some recursion here -- if this type depends on a type
				* a type we have yet to define this call should recurse until we're
				* in a sane state -- undefined if we can't map the type.
				*/
				if (this.kind === CursorKind.TypeRef) {
					t = mapType(this.referenced.type, this.referenced.spelling);
					tname = this.referenced.spelling;
				} else if (this.kind === CursorKind.UnexposedDecl) {
					t = mapType(this.type, this.type.spelling);
					tname = this.type.spelling;
				} else if (this.kind === CursorKind.FieldDecl && this.type.kind === TypeKind.Unexposed) {
					//// eslint-disable-next-line no-console
					//console.error('FieldDecl', this.type.kind, this.type.spelling);
					t = wrap.elements[wrap.elements.length - 1];
					/* This may not be entirely correct, we're assuming that because we
					* already have elements defined that we're at the name of it,
					* consider `union { int foo; } myUnion;` but it's also possible
					* we are at an actual definition and we should be defining this type
					*
					* TODO -- man I need tests.
					*/
					if (t) {
						t.name = this.spelling;
						return ChildVisitResult.Continue;
					}

					t = defineType(this.type.declaration);
					tname = this.spelling;
				} else {
					t = mapType(this.type, this.spelling);
					tname = this.spelling;
				}

				if (t) {
					/* Add the field for the struct */
					wrap.elements.push({
						name: tname,
						type: t.kind === "struct" ? t.name : t.type || t.name,
					});
					returnValue = ChildVisitResult.Continue;
				} else {
					/* This type has an element we don't know how to map yet, abort */
					wrap.abort = {
						name: tname,
					};
					//// eslint-disable-next-line no-console
					//console.error('breaking because of unmapped type', tname, this.kind);
					returnValue = ChildVisitResult.Break;
				}
			} else if (this.kind === CursorKind.UnexposedDecl || this.kind === CursorKind.UnexposedAttr) {
				//// eslint-disable-next-line no-console
				//console.error('unexposed decl', this.type.spelling);
				returnValue = ChildVisitResult.Continue;
			} else if (this.type.kind === CursorKind.BlockExpr) {
				//// eslint-disable-next-line no-console
				//console.error('block expr');
				returnValue = ChildVisitResult.Continue;
			} else {
				//// eslint-disable-next-line no-console
				//console.error('breaking because of unknown kind', this.type.kind, this.kind);
				wrap.abort = {
					kind: this.type.kind,
				};
				returnValue = ChildVisitResult.Break;
			}

			first = false;
			return returnValue;
		};

		type.referenced.canonical.visitChildren(firstVisitor);

		/* types should probably contain at least one type, and don't claim to support partially defined types */
		if (!wrap.abort && wrap.elements.length > 0) {
			if (unionName) {
				wrap.type = templates.UnionTmpl.render(wrap).trim();
				wrap.kind = "union";
			} else {
				wrap.type = templates.StructTmpl.render(wrap).trim();
				wrap.kind = "struct";
				toRender.types.push(wrap);
				structs[wrap.name] = wrap;
			}

			return wrap;
		}

		//// eslint-disable-next-line no-console
		//console.error(wrap);
		return undefined;
	};

	const mapEnum = function (type, returnValue) {
		let def;
		type.referenced.canonical.visitChildren(function (parent) {
			let value;

			if (returnValue.name[0] === "u") {
				value = this.enumUValue;
			} else {
				value = this.enumValue;
			}

			def = enums[parent.spelling];
			if (!def) {
				def = {};
				enums[parent.spelling] = def;
			}

			def[this.spelling] = value;

			return ChildVisitResult.Continue;
		});
		//// eslint-disable-next-line no-console
		//console.error(def);
	};

	const defineOpaque = function (canonical) {
		const returnValue = new WrapType(canonical);
		returnValue.opaque = true;
		if (!structs[returnValue.name]) {
			toRender.types.push({
				name: returnValue.name,
				type: templates.OpaqueTmpl.render(returnValue).trim(),
			});
			structs[returnValue.name] = returnValue;
		}

		return returnValue;
	};

	const defineFunction = function (name, type) {
		//// eslint-disable-next-line no-console
		//console.error('defining function', name);
		const returnValue = new WrapType(name);

		const result = mapType(type.result, name);

		if (!result) {
			//// eslint-disable-next-line no-console
			//console.error('could not map return type', type.result.spelling);
			returnValue.abort = {
				arg: type.result.spelling,
				kind: type.declaration.spelling,
				name,
				position: -1,
			};
			return returnValue;
		}

		returnValue.result = result.name;

		let i;
		let arg;
		let a;
		for (i = 0; i < type.argTypes; i++) {
			a = type.getArg(i);

			//// eslint-disable-next-line no-console
			//console.error('mapping argument', i);
			arg = mapType(a, name + "-arg" + i);
			if (!arg) {
				returnValue.abort = {
					arg: a.spelling,
					displayname: a.declaration.displayname,
					name,
					position: i,
				};
				return returnValue;
			}

			returnValue.args.push(arg);
		}

		return returnValue;
	};

	/*
		Turn the libclang type into ffi type
		TODO XXX FIXME -- Still missing array support (but node-ffi is too)
	*/
	const mapType = function (type, fieldname) {
		let returnValue;
		//// eslint-disable-next-line no-console
		//console.error('mapType', type.spelling, type.kind);
		if (type.kind === TypeKind.Pointer && type.pointeeType.kind === TypeKind.Char_S) {
			returnValue = new WrapType("ref.types.CString");
		} else {
			let {
				canonical,
			} = type;

			switch (type.kind) {
				case TypeKind.Typedef:
					/* Handle the case where someone has simply redefined an existing type */
					if (canonical.kind === TypeKind.Pointer && canonical.declaration.kind === CursorKind.NoDeclFound && type.declaration.spelling) {
						if (canonical.pointeeType.kind === TypeKind.FunctionProto) {
							returnValue = structs[type.declaration.spelling];
							if (!returnValue) {
								returnValue = defineFunction(type.declaration.spelling, canonical.pointeeType);
								if (returnValue.abort) {
									unmapped.push(returnValue.abort);
									return undefined;
								}

								toRender.types.push({
									name: returnValue.name,
									type: templates.FuncPtrTmpl.render(returnValue).trim(),
								});
								structs[type.declaration.spelling] = returnValue;
							}

							return returnValue;
						}

						returnValue = defineType(canonical.pointeeType.declaration);
						if (returnValue) {
							return new WrapType(returnValue.name + "Ptr");
						}

						return defineOpaque(type.declaration.spelling);
					}

					canonical = mapType(canonical, fieldname);

					if (canonical) {
						returnValue = canonical;
					} else {
						/* If this is a struct try and create */
						returnValue = defineType(type.declaration);
					}

					break;
				case TypeKind.Unexposed:
					/* Special case enums so we can pass them around as integer type */
					if (type.declaration.kind === CursorKind.EnumDecl) {
						returnValue = mapType(type.declaration.enumType, fieldname);
						mapEnum(type.declaration, returnValue);
					} else if (type.declaration.kind === CursorKind.StructDecl) {
						returnValue = defineType(type.declaration);
					}

					break;
				case TypeKind.Enum:
					if (type.declaration.enumType.kind === TypeKind.Invalid) {
						/* Enum values are labled invalid for some reason */
						returnValue = mapType(type.declaration, fieldname);
					} else {
						returnValue = mapType(type.declaration.enumType, fieldname);
						mapEnum(type.declaration, returnValue);
					}

					break;
				case TypeKind.Pointer:
					if (type.pointeeType.declaration.kind === CursorKind.TypedefDecl) {
						returnValue = defineType(type.pointeeType.declaration);
					} else {
						returnValue = typeMapper(type.pointeeType.canonical.kind);
						if (returnValue) {
							// TODO XXX FIXME template work
							if (returnValue === "ref.types.void") {
								returnValue = "voidPtr";
							} else {
								returnValue = "ref.refType(" + returnValue + ")";
							}

							return new WrapType(returnValue);
						}
					}

					if (returnValue) {
						returnValue = new WrapType(returnValue.name + "Ptr");
					} else if (type.pointeeType.declaration.kind === CursorKind.TypedefDecl && type.pointeeType.declaration.spelling) {
						returnValue = defineOpaque(type.pointeeType.declaration.spelling);
					} else {
						returnValue = {
							name: templates.OpaqueTmpl.render({}).trim(),
							type: templates.OpaqueTmpl.render({}).trim(),
						};
					}

					break;
				case TypeKind.ConstantArray:
					returnValue = mapType(type.elementType, fieldname);

					if (!returnValue) {
						returnValue = defineType(type.elementType.declaration);
					}

					returnValue.arrSize = type.arraySize;
					returnValue.type = templates.ArrayTmpl.render(returnValue).trim();
					//// eslint-disable-next-line no-console
					//console.error(fieldname, type.spelling, type.elementType.spelling, ret);
					break;
				case TypeKind.Record:
					//// eslint-disable-next-line no-console
					//console.error('mapType Record');
					returnValue = defineType(type.declaration);
					break;
				case TypeKind.Elaborated:
					//// eslint-disable-next-line no-console
					//console.error('mapType Elaborated', fieldname);
					returnValue = mapType(type.namedType, fieldname);
					break;
				default:
					//// eslint-disable-next-line no-console
					//console.error(type.spelling);
					returnValue = typeMapper(type.kind);
					if (returnValue) {
						returnValue = new WrapType(returnValue);
					}

					assert(type.kind !== 0);
					break;
			}
		}

		return returnValue;
	};

	const mainVisitor = function (_parent) {
		if (!matchPrefix(options.prefixes, this.spelling)) {
			return ChildVisitResult.Continue;
		}

		if (options.singleFile && normalize(this.location.presumedLocation.filename) !== options.filepath) {
			return ChildVisitResult.Continue;
		}

		switch (this.kind) {
			case CursorKind.FunctionDecl:
			{
				if (this.isInlined) {
					return ChildVisitResult.Continue;
				}

				//const result = mapType(this.resultType, this.spelling);
				const result = defineFunction(this.spelling, this.type);
				if (result.abort) {
					unmapped.push(result.abort);
					return ChildVisitResult.Continue;
				}

				toRender.functions.push(result);

				break;
			}

			case CursorKind.EnumDecl:
			{
				const result = mapType(this, this.spelling);
				mapEnum(this, result);

				break;
			}

			default:
				break;
		}

		return ChildVisitResult.Continue;
	};

	curs.canonical.visitChildren(mainVisitor);

	tu.dispose();
	idx.dispose();

	Object.keys(enums).forEach((enumDefinition) => {
		const enumEntry = {
			name: enumDefinition,
			values: [],
		};
		Object.keys(enums[enumDefinition]).forEach((vname) => {
			enumEntry.values.push({
				name: vname,
				value: enums[enumDefinition][vname],
			});
		});
		toRender.enums.push(enumEntry);
	});

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
