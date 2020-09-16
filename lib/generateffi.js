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

/* eslint camelcase: "off" */

const {
	join,
	normalize,
} = require("path");
const engineCheck = require("engine-check");

engineCheck({
	// NOTE: read engine range from the current package rather than the application entry point (main) module. The application can enforce their own range if they want to.
	searchRoot: join(__dirname, ".."),
});

const assert = require("assert");
const {
	readFileSync,
} = require("fs");
const hogan = require("hogan.js");
const prettier = require("prettier");

const {
	ChildVisitResult,
	CursorKind,
	Index,
	TranslationUnit,
	TypeKind,
} = require("libclang");

class WrapType {
	constructor(name) {
		this.name = name;
		this.type = name;
		this.abort = false;
		this.opaque = false;
		this.arrSize = false;
		this.return_type = undefined;
		this.args = [];
		this.elements = [];
		this.unionCount = 0;
	}
}

/*
 * Accepts an object as defined below
 * opts.filename -- required -- the full path to the header source file to parse
 * opts.library -- required -- the library ffi should use to dlopen
 * opts.prefix -- optional --  restrict imported functions to a given prefix
 * opts.includes -- optional -- a set of directory paths to aid type expansion
 * opts.compiler_args -- optional -- a set of clang command line options passed to the parser
 *
 * returns an object with the following fields
 * unmapped -- an array where each element object describes a function that failed to map
 *   position -- indicates which field failed to map, -1 is return value, otherwise argument index
 *   arg -- the kind of type in question
 *   name -- the spelling of the function
 *   decl -- the method signature (excluding the result type)
 * serialized -- string representation of the types and module [eval or save]
 */
exports.generate = function (options) {
	const fname = normalize(options.filename);
	const {
		library,
	} = options;
	let prefix = options.prefix || [];
	const includes = options.includes || [];
	let compiler_args = [];
	const single_file = options.single_file || false;

	const generateType = options.generateType || "ffi";

	// TODO: improve type generation mapping.
	const ffiMapType = require("./" + generateType + "-type-map");

	const templateDir = join(__dirname, "..", "templates", generateType);
	const ArrayTmpl = hogan.compile(readFileSync(join(templateDir, "array.mustache"), "utf8"));
	const FuncPtrTmpl = hogan.compile(readFileSync(join(templateDir, "funcptr.mustache"), "utf8"));
	const OpaqueTmpl = hogan.compile(readFileSync(join(templateDir, "opaque.mustache"), "utf8"));
	const StructTmpl = hogan.compile(readFileSync(join(templateDir, "struct.mustache"), "utf8"));
	const UnionTmpl = hogan.compile(readFileSync(join(templateDir, "union.mustache"), "utf8"));
	const TypeTmpl = hogan.compile(readFileSync(join(templateDir, generateType + ".mustache"), "utf8"));

	if (options.compiler_args) {
		compiler_args = options.compiler_args.slice(0);
	}

	if (!(Array.isArray(prefix))) {
		prefix = [
			prefix,
		];
	}

	const idx = new Index(true, true);

	includes.forEach((include) => {
		compiler_args.push("-I" + include);
	});

	const tu = TranslationUnit.fromSource(idx, fname, compiler_args);
	const curs = tu.cursor;

	const unmapped = [];
	const structs = {};
	const enums = {};

	const toRender = {
		enums: [],
		functions: [],
		library,
		types: [],
	};

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

		type.referenced.canonical.visitChildren(function (_parent) {
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
		});

		/* types should probably contain at least one type, and don't claim to support partially defined types */
		if (!wrap.abort && wrap.elements.length > 0) {
			if (unionName) {
				wrap.type = UnionTmpl.render(wrap).trim();
				wrap.kind = "union";
			} else {
				wrap.type = StructTmpl.render(wrap).trim();
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
				type: OpaqueTmpl.render(returnValue).trim(),
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
			returnValue = new WrapType(ffiMapType.CString);
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
									type: FuncPtrTmpl.render(returnValue).trim(),
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
						returnValue = ffiMapType(type.pointeeType.canonical.kind);
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
							name: OpaqueTmpl.render({}).trim(),
							type: OpaqueTmpl.render({}).trim(),
						};
					}

					break;
				case TypeKind.ConstantArray:
					returnValue = mapType(type.elementType, fieldname);

					if (!returnValue) {
						returnValue = defineType(type.elementType.declaration);
					}

					returnValue.arrSize = type.arraySize;
					returnValue.type = ArrayTmpl.render(returnValue).trim();
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
					returnValue = ffiMapType(type.kind);
					if (returnValue) {
						returnValue = new WrapType(returnValue);
					}

					assert(type.kind !== 0);
					break;
			}
		}

		return returnValue;
	};

	function matchPrefix(name) {
		let i;

		if (prefix.length === 0) {
			return true;
		}

		for (i = 0; i < prefix.length; i++) {
			if (name.indexOf(prefix[i]) === 0) {
				return true;
			}
		}

		return false;
	}

	/*
	* Main source traversal -- We're mostly/only? concerned with wrapping functions
	* we could theoretically handle types here, but handling it by dependency means
	* we don't necessarily work through types we eventually won't care about
	*/
	curs.canonical.visitChildren(function (_parent) {
		switch (this.kind) {
			case CursorKind.FunctionDecl:
				if (matchPrefix(this.spelling)) {
					if (single_file && normalize(this.location.presumedLocation.filename) !== fname) {
						return ChildVisitResult.Continue;
					}

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
				}

				break;
			default:
				break;
		}

		return ChildVisitResult.Continue;
	});

	//tu.dispose();
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

	const rendered = TypeTmpl.render(toRender);
	const formatted = prettier.format(rendered, {
		parser: "babel",
	});

	return {
		serialized: formatted,
		unmapped,
	};
};
