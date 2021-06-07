// Copyright 2011, 2012, 2013, 2014 Timothy J Fontaine <tjfontaine@gmail.com>
// Copyright 2020, 2021 Joel Purra <https://joelpurra.com/>
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

const prettier = require("prettier");

const getMetadata = require("./get-metadata");
const loadTemplates = require("./load-templates");
const mapOptions = require("./map-options");
const mapper = require("./mapper");

/*
 * Accepts an object with properties as defined below:
 * - filepath (required string) the path to the header source file to parse
 * - library (required string) the library ffi should use to dlopen. Set to null to use functions in the current process.
 * - prefixes (optional array of strings, default empty array) restrict top-level generation to the prefixes
 * - compilerArgs (optional array of strings, default empty array) a set of clang command line options passed to the parser
 * - singleFile (optional boolean, default false) only export functions found in this file
 *
 * Returns an object with the following fields:
 * - serialized (string) javascript representation of header file
 * - unmapped (array of objects) describes something that failed to map
 */
const generate = async (originalOptions) => {
	const options = await mapOptions(originalOptions);
	const templates = await loadTemplates();

	const {
		toRender,
		unmapped,
	} = await mapper(options, templates);

	toRender.metadata = await getMetadata(options);

	const rendered = templates.FFI.render(toRender);
	const formatted = prettier.format(rendered, {
		parser: "babel",
	});

	return {
		serialized: formatted,
		unmapped,
	};
};

module.exports = generate;
