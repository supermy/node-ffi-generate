#!/usr/bin/env node

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
	searchRoot: join(__dirname, ".."),
});

const {
	argv,
} = require("optimist")
	.usage("Generate node-ffi bindings for a given header file\nUsage: $0")
	.demand("f").alias("f", "file").describe("f", "The header file to parse")
	.demand("l").alias("l", "library").describe("l", "The name of the library to dlopen")
	.alias("m", "module").describe("m", "The name of module the bindings will be exported as")
	.boolean("x").alias("x", "file_only").describe("x", "Only export functions found in this file")
	.alias("p", "prefix").describe("p", "Only import functions whose name start with prefix")
	.boolean("s").alias("s", "strict").describe("s", "Use StrictType (experimental)")
	.alias("L", "libclang").describe("L", "Path to directory where libclang.{so,dylib} is located");

function tryClang(cb) {
	let libclang;

	try {
		libclang = require("libclang");
	} catch {
		libclang = false;
	}

	if (libclang) {
		return cb(true);
	}

	if (process.env.FFI_GENERATE_CHILD) {
		return cb(false);
	}

	require("child_process").exec("llvm-config --libdir", (err, stdout, _stderr) => {
		if (stdout.trim()) {
			cb(stdout.trim());
		} else {
			cb(err.code);
		}
	});
}

function generate() {
	const {
		generate,
	} = require("../lib/generateffi");

	const returnValue = generate({
	// eslint-disable-next-line camelcase
		compiler_args: argv._,
		filename: argv.f,
		library: argv.l,
		module: argv.m,
		prefix: argv.p,
		// eslint-disable-next-line camelcase
		single_file: argv.x,
		// eslint-disable-next-line camelcase
		strict_type: argv.s,
	});

	// eslint-disable-next-line no-console
	console.log(returnValue.serialized);

	if (generate.unmapped) {
		process.stderr.write("-------Unmapped-------\r\n");
		process.stderr.write(generate.unmapped + "\r\n");
	}
}

tryClang((returnValue) => {
	let library;

	if (Number.isNaN(returnValue)) {
		library = returnValue;
	}

	if (argv.L) {
		library = argv.L;
	}

	if (returnValue === true) {
		generate();
	} else if (library && returnValue !== false) {
		const {
			env,
		} = process;
		env.FFI_GENERATE_CHILD = "1";
		switch (process.platform) {
			case "darwin":
				env.DYLD_LIBRARY_PATH = library + ":" + (env.DYLD_LIBRARY_PATH || "");
				break;
			default:
				env.LD_LIBRARY_PATH = library + ":" + (env.LD_LIBRARY_PATH || "");
				break;
		}

		const c = require("child_process").spawn(process.execPath, process.argv.slice(1), {
			env,
		});
		c.stdout.pipe(process.stdout);
		c.stderr.pipe(process.stderr);
		c.on("exit", (code) => {
			process.exit(code);
		});
	} else {
	// eslint-disable-next-line no-console
		console.error("Unable to load libclang, make sure you have 3.2 installed, either specify -L or have llvm-config in your path");
	}
});
