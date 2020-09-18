const test = require("ava");
const fs = require("fs");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../helper/assert-expected-lines");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const {
		generate,
	} = require("../..");

	const generated = await generate({
		filepath: `${__filename}.h`,
		library: "does-not-matter",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	// NOTE: unmapped function arguments.
	t.deepEqual(generated.unmapped, [
		{
			arg: "Typedef",
			displayname: "__int128_t",
			name: "do_stuff__int128_t",
			position: 0,
		},
		{
			arg: "Typedef",
			displayname: "__uint128_t",
			name: "do_stuff__uint128_t",
			position: 0,
		},
	]);

	// NOTE: not necessary to generate the pointer version?
	const expectedTypes = "const types = {};";

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "const functions = new FFI.Library(\"does-not-matter\", {});";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
