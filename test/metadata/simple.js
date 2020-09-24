const test = require("ava");
const fs = require("fs");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../helper/assert-expected-lines");

const writeFile = promisify(fs.writeFile);

// eslint-disable-next-line ava/no-skip-test
test.skip("lines", async (t) => {
	const {
		generate,
	} = require("../..");

	const generated = await generate({
		filename: `${__filename}.h`,
		library: "simple",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.is(generated.unmapped.length, 0);

	const expected = `/*
	* This file was automatically generated. It is better to run the generator again, than to manually edit.
	*
	* @ffi-packager/ffi-generate v
	* - git commit v
	* - clang version 9.0.1-12
	* https://github.com/node-ffi-packager/node-ffi-generate
	*
	* File:
	* - Name: "simple.js.h"
	* - SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
	*
	* Generator options:
	* - Library: "simple"
	* - Single file: false
	* - Prefixes: []
	* - Compiler arguments: []
	*/`;

	assertExpectedLines(t, expected, generated.serialized);
});
