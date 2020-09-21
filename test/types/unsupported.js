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

	const expectedTypes = `const __int128_t = voidPtr;
	const __int128_tPtr = ref.refType(__int128_t);
	const __uint128_t = voidPtr;
	const __uint128_tPtr = ref.refType(__uint128_t);`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = `do_stuff__int128_t: [ref.types.void, [__int128_t]],
	do_stuff__uint128_t: [ref.types.void, [__uint128_t]],`;

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
