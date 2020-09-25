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

	t.deepEqual(generated.unmapped, []);

	// NOTE: not necessary to generate the pointer version?
	const expectedTypes = `
		const js_void = ref.types.void;
		const js_byte = ref.types.byte;
		const js_uchar = ref.types.uchar;
		const my_unmappable_types = Struct({
			my_bool: js_byte,
			my_uint8_t: js_uchar,
		});
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_unmappable_types]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
