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
		filename: `${__filename}.h`,
		library: "does-not-matter",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	// TODO: generate empty struct voidPtr?
	t.deepEqual(
		generated.unmapped,
		[
			{
				arg: "Typedef",
				displayname: "my_struct_t",
				name: "do_stuff",
				position: 0,
			},
		],
	);

	// TODO: generate empty struct voidPtr?
	const expectedTypes = "const types = {};";

	assertExpectedLines(t, expectedTypes, generated.serialized);

	// TODO: generate a function.
	const expectedFunctions = "const functions = new FFI.Library(\"does-not-matter\", {});";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
