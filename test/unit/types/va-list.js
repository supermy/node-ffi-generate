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

	// NOTE: it seems the va_list workaround is no longer needed.
	const expectedTypes = `
		const js_void = ref.types.void;
		const js_uint32 = ref.types.uint32;
		const js_voidPointer = ref.refType(js_void);
		const __va_list_tag = js_voidPointer;
		const __va_list_tag_array_1 = ArrayType(__va_list_tag, 1);
		const __builtin_va_list = __va_list_tag_array_1;
		const va_list = __builtin_va_list;
		const my_types = Struct({
			my_va_list: va_list,
		});
		const my_types_t = my_types;
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = `
		do_stuff: [js_void, [my_types_t]],
		do_stuff_va_list: [js_void, [va_list]],
	`;

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
