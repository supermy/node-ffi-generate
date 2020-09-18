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

	const expectedTypes = `const my_struct_t = voidPtr;
	const my_struct_tPtr = ref.refType(my_struct_t);`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	// TODO: argument should reference pointer type.
	const expectedFunctions = "do_stuff: [ref.types.void, [my_struct_t]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
