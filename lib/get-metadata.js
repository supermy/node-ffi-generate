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

const assert = require("assert");
const Debug = require("debug");
const execa = require("execa");
const hasha = require("hasha");
const path = require("path");
const {
	libclang,
	util,
} = require("@ffi-packager/libclang");

const packageJson = require("../package.json");

const executeGit = async (fallbackMessage, ...args) => {
	const debug = new Debug("ffi-generate:get-metadata");

	assert.strictEqual(typeof fallbackMessage, "string");
	assert.notStrictEqual(args.length, 0);

	try {
		const result = await execa("git", [
			"-C",
			__dirname,
			...args,
		]);

		return result.stdout;
	} catch (error) {
		debug("Calling git failed, using fallback message.", error);

		return fallbackMessage;
	}
};

const getMetadata = async (options) => {
	return {
		file: {
			name: JSON.stringify(path.basename(options.filepath)),
			path: JSON.stringify(options.filepath),
			sha256: await hasha.fromFile(options.filepath, {
				algorithm: "sha256",
			}),
		},
		generator: {
			git: {
				branch: await executeGit("(no git branch)", "branch", "--show-current"),
				describe: await executeGit("(no git describe)",
					"describe",
					"--always",
					"--tags",
					"--dirty",
					"--long",
					"--match",
					"v*",
				),
			},
			homepage: packageJson.homepage,
			name: packageJson.name,
			version: packageJson.version,
		},
		libclang: {
			version: util.cxStringToString(() => libclang.functions.clang_getClangVersion()),
		},
		options: {
			compilerArgs: JSON.stringify(options.compilerArgs),
			library: options.library,
			prefixes: JSON.stringify(options.prefixes),
			singleFile: (options.singleFile),
		},
	};
};

module.exports = getMetadata;
