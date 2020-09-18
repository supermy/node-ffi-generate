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

const execa = require("execa");
const {
	join,
} = require("path");
const {
	libclang,
	util,
} = require("@ffi-packager/libclang");

const packageJson = require("../package.json");

const getMetadata = async () => {
	return {
		generator: {
			git: {
				branch: (await execa("git", [
					"-C",
					join(__dirname, ".."),
					"branch",
					"--show-current",
				])).stdout,
				describe: (await execa("git", [
					"-C",
					join(__dirname, ".."),
					"describe",
					"--always",
					"--tags",
					"--dirty",
					"--long",
				])).stdout,
			},
			homepage: packageJson.homepage,
			name: packageJson.name,
			version: packageJson.version,
		},
		libclang: {
			version: util.cxStringToString(() => libclang.functions.clang_getClangVersion()),
		},
	};
};

module.exports = getMetadata;
