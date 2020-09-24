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
	} = require("../../lib/generateffi");

	const generated = await generate({
		filename: `${__filename}.h`,
		library: "simple",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.is(generated.unmapped.length, 0);

	// TODO: structs in the output? Fix unions.
	const expectedTypes = `const my_union = Struct({
		first: ref.types.int32,
		second: ref.types.int32,
	  });
	  const my_unionPtr = ref.refType(my_union);
	  const my_union_t = Struct({
		my_union: Union({
		  first: ref.types.int32,
		  second: ref.types.int32,
		}),
		my_union: my_union,
	  });
	  const my_union_tPtr = ref.refType(my_union_t);`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = `const functions = new FFI.Library("simple", {
		do_stuff: [ref.types.void, [my_union_tPtr]],
	  });`;

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
