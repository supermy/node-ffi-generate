// Example: generate javascript for the libclang header file.
const {
	exec,
} = require("child_process");
const {
	join,
} = require("path");
const {
	writeFileSync,
} = require("fs");
const prettier = require("prettier");
const {
	generate,
} = require("./lib/generateffi");

// NOTE: using path to the LLVM header directory from the environment.
const includedir = process.env.C_INCLUDE_PATH;
const result = generate({
	filename: join(includedir, "clang-c", "Index.h"),
	includes: [
		includedir,
	],
	library: "libclang",
	prefix: "clang_",
});

if (result.unmapped.length > 0) {
	console.log("----- UNMAPPED FUNCTIONS -----");
	console.log(result.unmapped);
	console.log("----- UNMAPPED FUNCTIONS -----");
}

// NOTE: write formatted javascript output.
writeFileSync(
	join(process.cwd(), "dynamic-clang.js"),
	prettier.format(result.serialized, {
		parser: "babel",
	}),
);

// NOTE: attempt to load and use generated code for verification.
const dynamicClang = require(join(process.cwd(), "./dynamic-clang.js"));
const ver = dynamicClang.functions.clang_getClangVersion();
console.log(dynamicClang.functions.clang_getCString(ver));
dynamicClang.functions.clang_disposeString(ver);
