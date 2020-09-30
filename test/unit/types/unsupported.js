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

	t.deepEqual(generated.unmapped, [
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 20,
				spelling: "Int128",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 12,
				spelling: "UInt128",
			},
		},
	]);

	const expectedTypes = `
		const js_void = ref.types.void;
		const js_voidPointer = ref.refType(js_void);
		const __int128_t = js_voidPointer;
		const __uint128_t = js_voidPointer;
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = `
		do_stuff__int128_t: [js_void, [__int128_t]],
		do_stuff__uint128_t: [js_void, [__uint128_t]],
	`;

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
