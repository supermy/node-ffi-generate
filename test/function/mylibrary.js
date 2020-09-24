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
		library: "mylibrary",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.deepEqual(generated.unmapped, []);

	const expectedConstants = "const constants = {};";

	assertExpectedLines(t, expectedConstants, generated.serialized);

	// TODO: create opaque voidPtr for myobj type?
	const expectedTypes = "const types = {};";

	assertExpectedLines(t, expectedTypes, generated.serialized);

	// TODO: fix myobj * being rendered as ref.refType(ref.types.int32)?
	const expectedFunctions = `const functions = new FFI.Library("mylibrary", {
		do_some_number_fudging: [
			ref.types.double,
			[ref.types.double, ref.types.int32],
		],
		create_object: [ref.refType(ref.types.int32), []],
		do_stuff_with_object: [ref.types.double, [ref.refType(ref.types.int32)]],
		use_string_with_object: [
			ref.types.void,
			[ref.refType(ref.types.int32), ref.types.CString],
		],
		delete_object: [ref.types.void, [ref.refType(ref.types.int32)]],
	});`;

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
