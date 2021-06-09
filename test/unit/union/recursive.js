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
		const js_voidPointer = ref.refType(js_void);
		const my_union = Union({
			my_recursive_union: js_voidPointer,
		});
		const my_union_t = my_union;

		types["js_void"] = js_void;
		types["js_voidPointer"] = js_voidPointer;
		types["my_union"] = my_union;
		types["my_union_t"] = my_union_t;
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_union_t]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
