const test = require("ava");
const execa = require("execa");
const fs = require("fs");
const {
	getBinPath,
} = require("get-bin-path");
const path = require("path");
const {
	promisify,
} = require("util");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const ffiGenerate = await getBinPath();
	let generated;

	const nodeDirectoryPath = path.dirname(process.argv0);

	let llvmConfigFound;

	try {
		// NOTE: can't easily test if llvm-config is in the same directory as the node executable.
		// NOTE: probably not very windows-compatible.
		const llvmConfigPath = path.join(nodeDirectoryPath, "llvm-config");

		await execa(llvmConfigPath);

		llvmConfigFound = true;
	} catch (error) {
		if (error.code === "ENOENT") {
			llvmConfigFound = false;
		}

		llvmConfigFound = true;
	}

	if (!llvmConfigFound) {
		t.pass("Cannot test for missing llvm-config, it is in the same PATH as node. Ignoring test by passing it.");

		return;
	}

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
					PATH: nodeDirectoryPath,
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

	t.assert(generated.includes("Could not find llvm-config (check PATH)."));
});
