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
	join,
} = require("path");
const engineCheck = require("engine-check");

engineCheck({
	// NOTE: read engine range from the current package rather than the application entry point (main) module. The application can enforce their own range if they want to.
	searchRoot: join(__dirname, ".."),
});

const assert = require("assert");
const fs = require("fs");
const hogan = require("hogan.js");
const path = require("path");
const util = require("util");

const libclang = require("libclang");

const {
	Cursor,
} = libclang;
const {
	Index,
} = libclang;
const {
	TranslationUnit,
} = libclang;
const {
	Type,
} = libclang;

/*
 * Accepts an object as defined below
 * opts.filename -- required -- the full path to the header source file to parse
 * opts.library -- required -- the library ffi should use to dlopen
 * opts.module -- optional -- the name of the module that will be exported (otherwise uses library name)
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
	const fname = path.normalize(options.filename);
	const {
		library,
	} = options;
	const module = options.module || options.library;
	let prefix = options.prefix || [];
	const includes = options.includes || [];
	let compiler_args = [];
	const single_file = options.single_file || false;
	const strict_type = options.strict_type || false;

	const generateType = options.generateType || "ffi";

	const ffiMapType = require("./" + generateType + "-type-map");

	const templateDir = path.join(__dirname, "..", "templates", generateType);
	const ArrayTmpl = hogan.compile(fs.readFileSync(path.join(templateDir, "array.mustache"), "utf8"));
	const FuncPtrTmpl = hogan.compile(fs.readFileSync(path.join(templateDir, "funcptr.mustache"), "utf8"));
	const OpaqueTmpl = hogan.compile(fs.readFileSync(path.join(templateDir, "opaque.mustache"), "utf8"));
	const StructTmpl = hogan.compile(fs.readFileSync(path.join(templateDir, "struct.mustache"), "utf8"));
	const UnionTmpl = hogan.compile(fs.readFileSync(path.join(templateDir, "union.mustache"), "utf8"));
	const TypeTmpl = hogan.compile(fs.readFileSync(path.join(templateDir, generateType + ".mustache"), "utf8"));

	if (options.compiler_args) {
		compiler_args = options.compiler_args.slice(0);
	}

	if (!(Array.isArray(prefix))) {
		prefix = [
			prefix,
		];
	}

	const idx = new Index(true, true);
	let tu;

	includes.forEach((include) => {
		compiler_args.push("-I" + include);
	});
	tu = TranslationUnit.fromSource(idx, fname, compiler_args);

	const curs = tu.cursor;

	const unmapped = [];
	const structs = {};
	const enums = {};

	const toRender = {
		enums: [],
		types: [],
		functions: [],
		module,
		library,
	};

	const WrapType = function (name) {
		this.name = name;
		this.type = name;
		this.abort = false;
		this.opaque = false;
		this.arrSize = false;
		this.return_type = undefined;
		this.args = [];
		this.elements = [];
		this.unionCount = 0;
	};

	/* For a given Typedef try and iterate fields and define an FFI struct */
	var defineType = function (type, unionName) {
		/* We've previously defined this type
     * TODO XXX FIXME? wanted to use type.usr since it's relevant per translation unit
     * but using just the regular spelling makes things nicer for accessibility
     */
		let name = type.spelling; let
			wrap;

		if (!name && unionName) {
			name = unionName;
		}

		if (!name && type.usr) {
			// TODO XXX FIXME we probably have a record here and are hacking our way
			// to find out its name
			name = type.usr.split("@")[2];
		}

		if (!name) {
			//console.error(name, !name, type.spelling, type.usr);
			return undefined;
		}

		wrap = structs[name];

		if (wrap) {
			return wrap;
		}

		wrap = new WrapType(name);

		let first = true;
		type.referenced.canonical.visitChildren(function (parent) {
			let returnValue; let t; let tname;
			/* First item in the cursor is the one we started with?
         * immediately move beyond it
         */
			//console.error('visiting', this.kind, this.spelling, parent.kind, parent.spelling);

			if (first && this.kind == Cursor.StructDecl) {
				first = false;
				return Cursor.Recurse;
			}

			if (this.kind == Cursor.UnionDecl) {
				const un = this.type.declaration.spelling || "union" + wrap.unionCount++;
				//console.error('UnionDecl', un, this.kind);
				const union = defineType(this.type.declaration, un);
				if (union) {
					union.kind = "union";
					wrap.elements.push(union);
				} else
				//console.error('failed to wrap union');
				{
					return Cursor.Continue;
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
				if (this.kind == Cursor.TypeRef) {
					t = mapType(this.referenced.type, this.referenced.spelling);
					tname = this.referenced.spelling;
				} else if (this.kind == Cursor.UnexposedDecl) {
					t = mapType(this.type, this.type.spelling);
					tname = this.type.spelling;
				} else if (this.kind == Cursor.FieldDecl && this.type.kind == Type.Unexposed) {
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
						return Cursor.Continue;
					}

					t = defineType(this.type.declaration);
					tname = this.spelling;
				} else {
					t = mapType(this.type, this.spelling);
					tname = this.spelling;
				}

				if (!t) {
					/* This type has an element we don't know how to map yet, abort */
					wrap.abort = {
						name: tname,
					};
					//console.error('breaking because of unmapped type', tname, this.kind);
					returnValue = Cursor.Break;
				} else {
					/* Add the field for the struct */
					wrap.elements.push({
						name: tname,
						type: t.kind === "struct" ? t.name : t.type || t.name,
					});
					returnValue = Cursor.Continue;
				}
			} else if (this.kind === Cursor.UnexposedDecl || this.kind === Cursor.UnexposedAttr) {
				//console.error('unexposed decl', this.type.spelling);
				returnValue = Cursor.Continue;
			} else if (this.type.kind == Cursor.BlockExpr) {
				//console.error('block expr');
				returnValue = Cursor.Continue;
			} else {
				//console.error('breaking because of unknown kind', this.type.kind, this.kind);
				wrap.abort = {
					kind: this.type.kind,
				};
				returnValue = Cursor.Break;
			}

			first = false;
			return returnValue;
		});

		/* types should probably contain at least one type, and don't claim to support partially defined types */
		if (!wrap.abort && wrap.elements.length > 0) {
			if (!unionName) {
				wrap.type = StructTmpl.render(wrap).trim();
				wrap.kind = "struct";
				toRender.types.push(wrap);
				structs[wrap.name] = wrap;
			} else {
				wrap.type = UnionTmpl.render(wrap).trim();
				wrap.kind = "union";
			}

			return wrap;
		}

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
				def = enums[parent.spelling] = {};
			}

			def[this.spelling] = value;

			return Cursor.Continue;
		});
		//console.error(def);
	};

	const defineOpaque = function (canonical) {
		ret = new WrapType(canonical);
		ret.opaque = true;
		if (!structs[ret.name]) {
			toRender.types.push({
				name: ret.name,
				type: OpaqueTmpl.render(ret).trim(),
			});
			structs[ret.name] = ret;
		}

		return ret;
	};

	const defineFunction = function (name, type) {
		//console.error('defining function', name);

		const returnValue = new WrapType(name);

		const result = mapType(type.result, name);

		if (!result) {
			//console.error('could not map return type', type.result.spelling);
			returnValue.abort = {
				name,
				arg: type.result.spelling,
				position: -1,
				kind: type.declaration.spelling,
			};
			return returnValue;
		}

		returnValue.result = result.name;

		let i; let arg; let a; let b;
		for (i = 0; i < type.argTypes; i++) {
			a = type.getArg(i);

			//console.error('mapping argument', i);
			arg = mapType(a, name + "-arg" + i);
			if (!arg) {
				returnValue.abort = {
					name,
					displayname: a.declaration.displayname,
					arg: a.spelling,
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
	var mapType = function (type, fieldname) {
		let returnValue;
		//console.error('mapType', type.spelling, type.kind);

		if (type.kind === Type.Pointer && type.pointeeType.kind === Type.Char_S) {
			returnValue = new WrapType(ffiMapType.CString);
		} else {
			switch (type.kind) {
				case Type.Typedef:
					/* Handle the case where someone has simply redefined an existing type */
					var {
						canonical,
					} = type;

					if (canonical.kind == Type.Pointer && canonical.declaration.kind == Cursor.NoDeclFound
              && type.declaration.spelling) {
						if (canonical.pointeeType.kind == Type.FunctionProto) {
							returnValue = structs[type.declaration.spelling];
							if (!returnValue) {
								returnValue = defineFunction(type.declaration.spelling, canonical.pointeeType);
								if (!returnValue.abort) {
									toRender.types.push({
										name: returnValue.name,
										type: FuncPtrTmpl.render(returnValue).trim(),
									});
									structs[type.declaration.spelling] = returnValue;
								} else {
									unmapped.push(returnValue.abort);
									return undefined;
								}
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
					} else /* If this is a struct try and create */
					{
						returnValue = defineType(type.declaration);
					}

					break;
				case Type.Unexposed:
					/* Special case enums so we can pass them around as integer type */
					if (type.declaration.kind === Cursor.EnumDecl) {
						returnValue = mapType(type.declaration.enumType, fieldname);
						mapEnum(type.declaration, returnValue);
					} else if (type.declaration.kind === Cursor.StructDecl) {
						returnValue = defineType(type.declaration);
					}

					break;
				case Type.Enum:
					if (type.declaration.enumType.kind === Type.Invalid) {
						/* Enum values are labled invalid for some reason */
						returnValue = mapType(type.declaration, fieldname);
					} else {
						returnValue = mapType(type.declaration.enumType, fieldname);
						mapEnum(type.declaration, returnValue);
					}

					break;
				case Type.Pointer:
					if (type.pointeeType.declaration.kind == Cursor.TypedefDecl) {
						returnValue = defineType(type.pointeeType.declaration);
					} else {
						returnValue = ffiMapType(type.pointeeType.canonical.kind);
						if (returnValue) {
							// TODO XXX FIXME template work
							if (returnValue != "ref.types.void") {
								returnValue = "ref.refType(" + returnValue + ")";
							} else {
								returnValue = "voidPtr";
							}

							return new WrapType(returnValue);
						}
					}

					if (!returnValue) {
						if (type.pointeeType.declaration.kind == Cursor.TypedefDecl && type.pointeeType.declaration.spelling) {
							returnValue = defineOpaque(type.pointeeType.declaration.spelling);
						} else {
							returnValue = {
								type: OpaqueTmpl.render({}).trim(),
								name: OpaqueTmpl.render({}).trim(),
							};
						}
					} else {
						returnValue = new WrapType(returnValue.name + "Ptr");
					}

					break;
				case Type.ConstantArray:
					returnValue = mapType(type.elementType, fieldname);

					if (!returnValue) {
						returnValue = defineType(type.elementType.declaration);
					}

					returnValue.arrSize = type.arraySize;
					returnValue.type = ArrayTmpl.render(returnValue).trim();
					//console.error(fieldname, type.spelling, type.elementType.spelling, ret);
					break;
				case Type.Record:
					//console.error('mapType Record');
					returnValue = defineType(type.declaration);
					break;
				case Type.Elaborated:
					//console.error('mapType Elaborated', fieldname);
					returnValue = mapType(type.namedType, fieldname);
					break;
				default:
					//console.error(type.spelling);
					returnValue = ffiMapType(type.kind);
					if (returnValue) {
						returnValue = new WrapType(returnValue);
					}

					assert(type.kind != 0);
					break;
			}
		}

		return returnValue;
	};

	function matchPrefix(name) {
		let i;

		if (!prefix.length) {
			return true;
		}

		for (i = 0; i < prefix.length; i++) {
			if (name.indexOf(prefix[i]) == 0) {
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
	curs.canonical.visitChildren(function (parent) {
		switch (this.kind) {
			case Cursor.FunctionDecl:
				if (matchPrefix(this.spelling)) {
					if (single_file && path.normalize(this.location.presumedLocation.filename) !== fname) {
						return Cursor.Continue;
					}

					if (this.isInlined) {
						return Cursor.Continue;
					}

					//var result = mapType(this.resultType, this.spelling);
					const result = defineFunction(this.spelling, this.type);
					if (result.abort) {
						unmapped.push(result.abort);
						return Cursor.Continue;
					}

					toRender.functions.push(result);
				}

				break;
		}

		return Cursor.Continue;
	});

	//tu.dispose();
	idx.dispose();

	Object.keys(enums).forEach((e) => {
		const ee = {
			name: e,
			values: [],
		};
		Object.keys(enums[e]).forEach((vname) => {
			ee.values.push({
				name: vname,
				value: enums[e][vname],
			});
		});
		toRender.enums.push(ee);
	});

	return {
		unmapped,
		serialized: TypeTmpl.render(toRender),
	};
};

const generateLibClang = function () {
	const {
		exec,
	} = require("child_process");

	exec("llvm-config --includedir", (fail, out, err) => {
		const includedir = out.trim();
		const result = exports.generate({
			filename: path.join(includedir, "clang-c", "Index.h"),
			includes: [
				includedir,
			],
			library: "libclang",
			prefix: "clang_",
		});

		if (result.unmapped.length > 0) {
			console.log("----- UNMAPPED FUNCTIONS -----");
			console.log(result.unmapped);
			console.log("----- UNMAPPED FUNCTIONS -----");
		}

		const jsb = require("js-beautify");
		require("fs").writeFileSync(path.join(__dirname, "newclang.js"), jsb.js_beautify(result.serialized));
		const dynamic_clang = require(path.join(__dirname, "newclang"));
		const ver = dynamic_clang.libclang.clang_getClangVersion();
		console.log(dynamic_clang.libclang.clang_getCString(ver));
		dynamic_clang.libclang.clang_disposeString(ver);
	});
};

if (require.main === module) {
	generateLibClang();
}
