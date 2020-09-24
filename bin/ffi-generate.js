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
const optimist = require("optimist");

const {
	generate,
} = require("..");

const runGenerator = async () => {
	const {
		argv,
	} = optimist
		.usage("Generate node-ffi-napi javascript bindings for a given C/C++ header file")
		.demand("f").alias("f", "file").describe("f", "The header file to parse")
		.demand("l").alias("l", "library").describe("l", "The name of the library to dlopen")
		.boolean("x").alias("x", "single-file").describe("x", "Only export functions found in this file")
		.alias("p", "prefix").describe("p", "Only import functions whose name start with prefix. Can be specified multiple times.");

	const returnValue = generate({
	// eslint-disable-next-line camelcase
		compiler_args: argv._,
		filename: argv.f,
		library: argv.l,
		prefix: argv.p,
		// eslint-disable-next-line camelcase
		single_file: argv.x,
	});

	// eslint-disable-next-line no-console
	console.log(returnValue.serialized);

	if (generate.unmapped) {
		process.stderr.write("-------Unmapped-------\r\n");
		process.stderr.write(generate.unmapped + "\r\n");
	}
};

const mainAsync = async () => {
	try {
		await runGenerator();
	} catch (error) {
		// NOTE: root error handler for asynchronous errors.
		// eslint-disable-next-line no-console
		console.error(error);

		process.exitCode = 1;
	}
};

const main = () => {
	try {
		engineCheck({
			searchRoot: join(__dirname, ".."),
		});

		mainAsync();
	} catch (error) {
		// NOTE: root error handler for synchronous errors.
		// eslint-disable-next-line no-console
		console.error(error);

		process.exitCode = 1;
	}
};

main();
