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

	// TODO: fix typedef aliasing generating a pointer to a struct wrapper of the original type.
	const expectedTypes = `
		const js_void = ref.types.void;
		const js_voidPointer = ref.refType(ref.types.void);
		const my_struct = Struct({
			my_void: js_voidPointer,
		});
		const my_struct_t = Struct({
			my_struct: my_struct,
		});
		const my_struct_tPointer = ref.refType(my_struct_t);
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_struct_tPointer]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
