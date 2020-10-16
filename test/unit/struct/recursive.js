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

	const expectedTypes = `
		const types = {};

		const js_void = ref.types.void;
		const my_struct = Struct({
			my_recursive_struct: types.my_struct,
		});
		const my_struct_t = my_struct;

		types["js_void"] = js_void;
		types["my_struct"] = my_struct;
		types["my_struct_t"] = my_struct_t;
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_struct_t]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
