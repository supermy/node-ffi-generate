const test = require("ava");
const execa = require("execa");
const semver = require("semver");

test("llvm-config", async (t) => {
	const llvmConfigResult = await execa("llvm-config", [
		"--version",
	]);

	const parsedVersion = semver.parse(llvmConfigResult.stdout);

	t.assert(parsedVersion);
	t.is(typeof parsedVersion, "object");
	t.assert(parsedVersion.major >= 9);
});
