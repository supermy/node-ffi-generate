// Example: generate javascript for the libclang header file.
const assert = require("assert");
const {
	exec,
} = require("child_process");
const {
	join,
} = require("path");
const {
	writeFileSync,
	readFileSync,
} = require("fs");
const {
	generate,
} = require("./lib/generateffi");

assert.strictEqual(typeof process.env.C_INCLUDE_PATH, "string");

// NOTE: using path(s) to the LLVM header directory from the environment; assuming LLVM is in the first path.
const includedir = process.env.C_INCLUDE_PATH.split(":")[0];
const headerFilePath = join(includedir, "clang-c", "Index.h");

assert.doesNotThrow(() => readFileSync(headerFilePath))

const result = generate({
	filename: headerFilePath,
	includes: [
		includedir,
	],
	library: "libclang",
	prefix: "clang_",
});

if (result.unmapped.length > 0) {
	console.warn("----- UNMAPPED FUNCTIONS -----");
	console.warn(result.unmapped);
	console.warn("----- UNMAPPED FUNCTIONS -----");
}

// NOTE: write javascript output to disk.
writeFileSync(
	join(process.cwd(), "dynamic-clang.js"),
	result.serialized,
);

// NOTE: attempt to load and use generated code for verification.
const dynamicClang = require(join(process.cwd(), "./dynamic-clang.js"));
const ver = dynamicClang.functions.clang_getClangVersion();
console.log(dynamicClang.functions.clang_getCString(ver));
dynamicClang.functions.clang_disposeString(ver);
