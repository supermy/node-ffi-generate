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

const Debug = require("debug");
const assert = require("assert");
const path = require("path");

const mapOptions = async (originalOptions) => {
	const debug = new Debug("ffi-generate:map-options");
	debug("input", originalOptions);

	const allowedOptionKeys = [
		"compilerArgs",
		"filepath",
		"library",
		"prefixes",
		"singleFile",
	];

	assert(Object.keys(originalOptions).length <= allowedOptionKeys.length);
	assert(Object.keys(originalOptions).every((originalOptionKey) => allowedOptionKeys.includes(originalOptionKey)));

	assert(typeof originalOptions.compilerArgs === "undefined" || Array.isArray(originalOptions.compilerArgs));
	assert(typeof originalOptions.filepath === "string" && originalOptions.filepath.length > 0);
	assert(originalOptions.library === null || (typeof originalOptions.library === "string" && originalOptions.library.length > 0));
	assert(typeof originalOptions.prefixes === "undefined" || Array.isArray(originalOptions.prefixes));
	assert(typeof originalOptions.singleFile === "undefined" || typeof originalOptions.singleFile === "boolean");

	assert(originalOptions.library === null || (typeof originalOptions.library === "string" && originalOptions.library.length > 0));

	const options = {
		compilerArgs: originalOptions.compilerArgs || [],
		filepath: path.normalize(originalOptions.filepath),
		library: originalOptions.library === "null" || originalOptions.library === null ? "null" : `"${originalOptions.library}"`,
		prefixes: Array.isArray(originalOptions.prefixes)
			? [
				...(originalOptions.prefixes),
			]
			: [],
		singleFile: Boolean(originalOptions.singleFile),
	};

	Object.freeze(options);

	debug("output", options);

	return options;
};

module.exports = mapOptions;
