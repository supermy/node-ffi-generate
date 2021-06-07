const test = require("ava");
const fs = require("fs");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../../helper/assert-expected-lines");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const {
		generate,
	} = require("../../..");

	const generated = await generate({
		filepath: `${__filename}.h`,
		library: "does-not-matter",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.deepEqual(generated.unmapped, []);

	const expected = `/*
	* This file was automatically generated. It is better to run the generator again, than to manually edit.
	*
	* @ffi-packager/ffi-generate v
	* - git commit
	* - clang version
	* https://github.com/node-ffi-packager/node-ffi-generate
	*
	* File:
	* - Name: "simple.js.h"
	* - SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
	*
	* Generator options:
	* - Library: "does-not-matter"
	* - Single file: false
	* - Prefixes: []
	* - Compiler arguments: []
	*/`;

	assertExpectedLines(t, expected, generated.serialized);
});
