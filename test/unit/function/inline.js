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

	// NOTE: ignoring the inline function.
	const expected = `
		const functions = new FFI.Library("does-not-matter", {
			my_function: [js_void, []],
		});
	  `;

	assertExpectedLines(t, expected, generated.serialized);
});
