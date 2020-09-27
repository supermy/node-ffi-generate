const test = require("ava");
const execa = require("execa");
const fs = require("fs");
const {
	getBinPath,
} = require("get-bin-path");
const {
	promisify,
} = require("util");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const ffiGenerate = await getBinPath();
	let generated;

	try {
		await execa(ffiGenerate);

		t.fail("Expected failing execution.");
	} catch (error) {
		t.is(error.exitCode, 1);
		t.is(error.timedOut, false);
		t.is(error.stdout.length, 0);

		generated = error.stderr;
	}

	await writeFile(__filename + ".output.js", generated);

	t.assert(generated.includes("Generate node-ffi-napi javascript bindings for a given C/C++ header file"));
	t.assert(generated.includes("Missing required arguments: f, l"));
});
