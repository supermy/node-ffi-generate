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
const fs = require("fs");
const path = require("path");
const {
	promisify,
} = require("util");

const Bluebird = require("bluebird");
const hogan = require("hogan.js");
const {
	mapValues,
} = require("lodash");

const readFile = promisify(fs.readFile);

const loadTemplate = async (filename) => {
	const debug = new Debug("ffi-generate:load-template");

	const templateDirectory = path.join(__dirname, "..", "templates");
	const templatePath = path.join(templateDirectory, filename);

	debug(templatePath);

	return hogan.compile(
		await readFile(templatePath, "utf8"),
	);
};

const loadTemplates = async () => {
	const templates = mapValues(
		{
			Array: "array.mustache",
			FFI: "ffi.mustache",
			Function: "function.mustache",
			Opaque: "opaque.mustache",
			Struct: "struct.mustache",
			Union: "union.mustache",
		},
		(filename) => loadTemplate(filename),
	);

	return Bluebird.props(templates);
};

module.exports = loadTemplates;
