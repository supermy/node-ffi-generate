// Example: generate javascript for the libclang header file.
/* eslint-disable no-console */
const assert = require("assert");
const {
	join,
} = require("path");
const {
	writeFileSync,
	readFileSync,
} = require("fs");
const {
	generate,
} = require("../../..");

assert.strictEqual(typeof process.env.C_INCLUDE_PATH, "string");

// NOTE: using path(s) to the LLVM header directory from the environment; assuming LLVM is in the first path.
const llvmIncludeDir = process.env.C_INCLUDE_PATH.split(":")[0];
const headerFilePath = join(llvmIncludeDir, "clang-c", "Index.h");

assert.doesNotThrow(() => readFileSync(headerFilePath));

const result = generate({
	filename: headerFilePath,
	library: "libclang",
	prefix: "clang_",
});

if (result.unmapped.length > 0) {
	console.warn("----- UNMAPPED FUNCTIONS -----");
	console.warn(result.unmapped);
	console.warn("----- UNMAPPED FUNCTIONS -----");
}

// NOTE: write javascript output to disk.
const dynamicClangPath = join(process.cwd(), "dynamic-clang.js");

writeFileSync(
	dynamicClangPath,
	result.serialized,
);

// NOTE: attempt to load and use generated code for verification.
const dynamicClang = require(dynamicClangPath);
const ver = dynamicClang.functions.clang_getClangVersion();
console.log(dynamicClang.functions.clang_getCString(ver));
dynamicClang.functions.clang_disposeString(ver);
