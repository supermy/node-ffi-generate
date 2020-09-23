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

	t.is(generated.unmapped.length, 0);

	const expectedConstants = "const constants = {};";

	assertExpectedLines(t, expectedConstants, generated.serialized);

	const expectedTypes = "const types = {};";

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = `const functions = new FFI.Library("mylibrary", {
		create_object: [ref.refType(ref.types.int32), []],
		delete_object: [ref.types.void, [ref.refType(ref.types.int32)]],
		do_some_number_fudging: [
			ref.types.double,
			[ref.types.double, ref.types.int32],
		],
		do_stuff_with_object: [ref.types.double, [ref.refType(ref.types.int32)]],
		use_string_with_object: [
			ref.types.void,
			[ref.refType(ref.types.int32), ref.types.CString],
		],
	});`;

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
