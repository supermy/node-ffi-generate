// Example: generate javascript for the libclang header file.
/* eslint-disable no-console */
const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const {
	promisify,
} = require("util");
const {
	generate,
} = require("../../..");

const exec = promisify(childProcess.exec);
const writeFile = promisify(fs.writeFile);

const main = async () => {
	// NOTE: dynamically detecting LLVM's include directory.
	const llvmIncludeDir = (await exec("llvm-config --includedir", {})).stdout.trim();
	const headerFilePath = path.join(llvmIncludeDir, "clang-c", "Index.h");

	const generated = await generate({
		compilerArgs: [
			"--include-directory",
			llvmIncludeDir,
		],
		filepath: headerFilePath,
		library: "libclang",
		prefixes: [
			"clang_",
		],
	});

	if (generated.unmapped.length > 0) {
		console.warn("----- UNMAPPED -----", JSON.stringify(generated.unmapped, null, 2));
	}

	// NOTE: write javascript output to disk.
	const dynamicClangPath = "./dynamic-clang.js";
	await writeFile(dynamicClangPath, generated.serialized);

	// NOTE: attempt to load and use generated code for verification.
	const dynamicClang = require(dynamicClangPath);
	const ver = dynamicClang.functions.clang_getClangVersion();
	console.log(dynamicClang.functions.clang_getCString(ver));
	dynamicClang.functions.clang_disposeString(ver);
};

main();
