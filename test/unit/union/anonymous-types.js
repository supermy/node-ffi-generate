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

	// NOTE: the anonymous counter depends on the visited order.
	const expectedTypes = `
		const js_void = ref.types.void;
		const js_voidPointer = ref.refType(js_void);
		const my_union___Ua_0 = Union({
			my_a: js_voidPointer,
			my_b: js_voidPointer,
		});
		const my_union___Ua_1 = Union({
			my_x: js_voidPointer,
			my_y: js_voidPointer,
			my_z: js_voidPointer,
		});
		const my_union___Sa_2 = Struct({
			my_c: js_voidPointer,
			my_d: js_voidPointer,
		});
		const my_union___Sa_3 = Struct({
			my_t: js_voidPointer,
			my_u: js_voidPointer,
			my_v: js_voidPointer,
		});
		const my_union = Union({
		my_void: js_voidPointer,
			anonymous_0: my_union___Ua_0,
			anonymous_1: my_union___Ua_1,
			anonymous_2: my_union___Sa_2,
			anonymous_3: my_union___Sa_3,
		});
		const my_union_t = my_union;
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_union_t]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
