const test = require("ava");
const fs = require("fs");
const {
	join,
} = require("path");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../../helper/assert-expected-lines");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const {
		generate,
	} = require("../../..");

	const llvmIncludeDir = join(__dirname, "include");
	const headerFilePath = join(llvmIncludeDir, "clang-c", "Index.h");

	const generated = await generate({
		// eslint-disable-next-line camelcase
		compiler_args: [
			"--include-directory",
			llvmIncludeDir,
		],
		// eslint-disable-next-line camelcase
		file_only: true,
		filename: headerFilePath,
		library: "libclang",
		prefix: [
			"clang_",
			"CX",
		],
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.is(generated.unmapped.length, 0);

	const expected = (await readFile(__filename + ".expected.js")).toString();

	assertExpectedLines(t, expected, generated.serialized);
});
