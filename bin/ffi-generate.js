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
const execa = require("execa");
const {
	pick,
} = require("lodash");
const optimist = require("optimist");
const SegfaultHandler = require("segfault-handler");

const tryRetryLoadLibclang = async () => {
	try {
		// NOTE: if this succeeds, the libclang library could be loaded by dlopen().
		// eslint-disable-next-line import/no-unassigned-import
		require("@ffi-packager/libclang");
	} catch (libclangLoadError) {
		if (libclangLoadError.code === "ENOENT") {
			const libraryPathEnvironmentVariableName = process.platform === "darwin" ? "DYLD_LIBRARY_PATH" : "LD_LIBRARY_PATH";

			if (process.env.FFI_GENERATE_RETRY) {
				throw new Error(`Could not load the libclang library (check ${libraryPathEnvironmentVariableName}). ${JSON.stringify(pick(
					process.env,
					[
						"FFI_GENERATE_RETRY",
						libraryPathEnvironmentVariableName,
					],
				))}`);
			}

			let llvmConfigLibDir;

			try {
				llvmConfigLibDir = await execa("llvm-config", [
					"--libdir",
				]);
			} catch (llvmConfigExecaError) {
				// https://github.com/sindresorhus/execa/blob/1ac56eac5f6e993fd2a2a3ad308fd5c18deb25a9/test/test.js#L10
				const ENOENT_REGEXP = process.platform === "win32" ? /failed with exit code 1/ : /spawn.* ENOENT/;

				if (ENOENT_REGEXP.test(llvmConfigExecaError)) {
					throw new Error(`Could not find llvm-config (check PATH). ${JSON.stringify(pick(
						process.env,
						[
							"PATH",
						],
					))}`);
				}

				throw llvmConfigExecaError;
			}

			try {
				// NOTE: re-execute this javascript file with added environment variables.
				const reexecute = execa.node(
					__filename,
					process.argv.slice(2),
					{
						env: {
							FFI_GENERATE_RETRY: process.pid,
							[libraryPathEnvironmentVariableName]: [
								llvmConfigLibDir.stdout,
							].concat(
								process.env[libraryPathEnvironmentVariableName]
									? process.env[libraryPathEnvironmentVariableName].split(":")
									: [],
							).join(":"),
						},
					},
				);
				reexecute.stdout.pipe(process.stdout);
				reexecute.stderr.pipe(process.stderr);

				await reexecute;
			} catch (reexecuteError) {
				const ffiGenerateMissingArguments = /Missing required arguments/;

				// NOTE: ignore output with missing arguments message from own code -- that's a "good" result.
				if (!ffiGenerateMissingArguments.test(reexecuteError)) {
					throw reexecuteError;
				}
			}

			return false;
		}

		throw libclangLoadError;
	}

	return true;
};

const runGenerator = async () => {
	const {
		generate,
	} = require("..");

	const {
		argv,
	} = optimist
		.usage("Generate node-ffi-napi javascript bindings for a given C/C++ header file")
		.demand("f").alias("f", "file").describe("f", "The header file to parse")
		.demand("l").alias("l", "library").describe("l", "The name of the library to dlopen. Set to null to use functions in the current process.")
		.boolean("x").alias("x", "single-file").describe("x", "Only export functions found in this file")
		.alias("p", "prefix").describe("p", "Only import functions whose name start with prefix. Can be specified multiple times.");

	const generated = await generate({
		compilerArgs: argv._,
		filepath: argv.f,
		library: argv.l,
		prefixes: argv.p ? [].concat(argv.p) : undefined,
		singleFile: argv.x,
	});

	// eslint-disable-next-line no-console
	console.log(generated.serialized);

	if (generated.unmapped.length > 0) {
		// eslint-disable-next-line no-console
		console.warn("----- UNMAPPED -----", JSON.stringify(generated.unmapped, null, 2));
	}
};

const loadAndGenerate = async () => {
	const succeeded = await tryRetryLoadLibclang();

	if (succeeded) {
		await runGenerator();
	}
};

const mainAsync = async () => {
	try {
		await loadAndGenerate();
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

		const segfaultHandlerLogName = `ffi-generate.segfault.${new Date().toISOString().replace(/:/g, "").toLowerCase()}.${process.pid}.log`;
		SegfaultHandler.registerHandler(segfaultHandlerLogName);

		mainAsync();
	} catch (error) {
		// NOTE: root error handler for synchronous errors.
		// eslint-disable-next-line no-console
		console.error(error);

		process.exitCode = 1;
	}
};

main();
