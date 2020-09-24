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

	// TODO: structs in the output? Fix enums.
	const expectedTypes = `const my_enum_t = Struct({
		my_enum: ref.types.int32,
	  });
	  const my_enum_tPtr = ref.refType(my_enum_t);`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [ref.types.void, [my_enum_tPtr]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
