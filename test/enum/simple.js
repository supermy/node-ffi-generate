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

	const expectedConstants = `const constants = {
		my_enum: {
		  FIRST: 0,
		  SECOND: -1,
		  LAST: 99,
		  0: "FIRST",
		  "-1": "SECOND",
		  99: "LAST",
		},
	  };`;

	assertExpectedLines(t, expectedConstants, generated.serialized);

	// TODO: where is uchar coming from?
	const expectedTypes = `
		const js_uchar = ref.types.uchar;
		const js_void = ref.types.void;
		const js_int32 = ref.types.int32;
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	// TODO: refer to my_enum_t instead if int32?
	const expectedFunctions = "do_stuff: [js_void, [js_int32]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
