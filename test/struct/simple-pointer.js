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
		library: "does-not-matter",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.deepEqual(generated.unmapped, []);

	// TODO: fix typedef aliasing generating a pointer to the original type.
	const expectedTypes = `const my_struct_t = Struct({
		my_void: voidPtr,
	  });
	  const my_struct_tPtr = ref.refType(my_struct_t);`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [ref.types.void, [my_struct_tPtr]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
