const test = require("ava");
const fs = require("fs");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../../../helper/assert-expected-lines");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const {
		generate,
	} = require("../../../..");

	const generated = await generate({
		filepath: `${__filename}.h`,
		library: "does-not-matter",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.deepEqual(generated.unmapped, []);

	const expectedTypes = `
		const js_uchar = ref.types.uchar;
		const js_uint32 = ref.types.uint32;
		const my_result_t = js_uint32;
		const js_void = ref.types.void;
		const js_voidPointer = ref.refType(js_void);
		const my_struct = js_voidPointer;
		const my_struct_t = my_struct;
		const my_struct_tPointer = ref.refType(my_struct_t);
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = `
		do_more_stuff: [my_result_t, [my_struct_tPointer]],
		do_stuff: [my_result_t, [my_struct_tPointer]],
	`;

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
