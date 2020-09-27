const test = require("ava");
const execa = require("execa");
const fs = require("fs");
const {
	getBinPath,
} = require("get-bin-path");
const {
	join,
} = require("path");
const {
	promisify,
} = require("util");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const ffiGenerate = await getBinPath();
	let generated;

	try {
		await execa(
			ffiGenerate, [
				"--file",
				`${__filename}.h`,
				"--library",
				"does-not-matter",
			], {
				env: {
					DYLD_LIBRARY_PATH: undefined,
					LD_LIBRARY_PATH: undefined,
					PATH: `${join(__dirname, "fake-llvm-config")}:${process.env.PATH}`,
				},
			},
		);

		t.fail("Expected failing execution.");
	} catch (error) {
		t.is(error.exitCode, 1);
		t.is(error.timedOut, false);
		t.is(error.stdout.length, 0);

		generated = error.stderr;
	}

	await writeFile(__filename + ".output.js", generated);

	t.assert(generated.includes("Error: Could not load the libclang library"));
});
