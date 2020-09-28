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

	const expectedConstants = `const constants = {
		my_enum: {
		  FIRST: 0,
		  SECOND: 9223372036854775807,
		  LAST: -9223372036854775807,
		  0: "FIRST",
		  "9223372036854775807": "SECOND",
		  "-9223372036854775807": "LAST",
		},
	  };`;

	assertExpectedLines(t, expectedConstants, generated.serialized);

	// TODO: where is uchar coming from?
	// TODO: refer to constants.my_enum instead of a number type?
	const expectedTypes = `
		const js_uchar = ref.types.uchar;
		const js_void = ref.types.void;
		const js_long = ref.types.long;
		const my_enum_t = js_long;
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_enum_t]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
