const test = require("ava");
const execa = require("execa");
const fs = require("fs");
const {
	getBinPath,
} = require("get-bin-path");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../helper/assert-expected-lines");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const ffiGenerate = await getBinPath();

	const result = await execa(ffiGenerate, [
		"--file",
		`${__filename}.h`,
		"--library",
		"does-not-matter",
		"--single-file",
	]);
	const generated = result.stdout;

	await writeFile(__filename + ".output.js", generated);

	t.assert(!result.stderr.includes("UNMAPPED"));

	const expectedTypes = `
		const js_void = ref.types.void;
		const js_voidPointer = ref.refType(js_void);
		const my_struct = Struct({
			my_void: js_voidPointer,
		});
		const my_struct_t = my_struct;
	`;

	assertExpectedLines(t, expectedTypes, generated);

	const expectedFunctions = `
		const functions = new FFI.Library("does-not-matter", {
			first_file_stuff: [js_void, [my_struct_t]],
		});
	`;

	assertExpectedLines(t, expectedFunctions, generated);
});
