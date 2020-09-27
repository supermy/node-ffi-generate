const test = require("ava");
const execa = require("execa");
const fs = require("fs");
const {
	getBinPath,
} = require("get-bin-path");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../helper/assert-expected-lines");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const ffiGenerate = await getBinPath();

	const result = await execa(ffiGenerate, [
		"--file",
		`${__filename}.h`,
		"--library",
		"does-not-matter",
	]);
	const generated = result.stdout;

	await writeFile(__filename + ".output.js", generated);

	t.assert(!generated.includes("UNMAPPED"));

	// TODO: fix prefix filtering for empty prefix.
	const expectedTypes = `const types = {};`;

	assertExpectedLines(t, expectedTypes, generated);

	const expectedFunctions = `const functions = new FFI.Library("does-not-matter", {});`;

	assertExpectedLines(t, expectedFunctions, generated);
});
