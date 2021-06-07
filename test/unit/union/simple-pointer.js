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
		const js_void = ref.types.void;
		const js_int32 = ref.types.int32;
		const my_union = Union({
			first: js_int32,
			second: js_int32,
		});
		const my_union_t = my_union;
		const my_union_tPointer = ref.refType(my_union_t);
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_union_tPointer]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
