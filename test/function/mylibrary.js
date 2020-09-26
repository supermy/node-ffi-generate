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
		library: "mylibrary",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.deepEqual(generated.unmapped, []);

	const expectedConstants = "const constants = {};";

	assertExpectedLines(t, expectedConstants, generated.serialized);

	// TODO: create opaque void pointer type for myobj type?
	const expectedTypes = `
		const js_double = ref.types.double;
		const js_int32 = ref.types.int32;
		const js_int32Pointer = ref.refType(js_int32);
		const js_void = ref.types.void;
		const js_CString = ref.types.CString;
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	// TODO: fix myobj * being rendered as an int32 pointer?
	const expectedFunctions = `
		create_object: [js_int32Pointer, []],
		delete_object: [js_void, [js_int32Pointer]],
		do_some_number_fudging: [js_double, [js_double, js_int32]],
		do_stuff_with_object: [js_double, [js_int32Pointer]],
		use_string_with_object: [js_void, [js_int32Pointer, js_CString]],
	`;

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
