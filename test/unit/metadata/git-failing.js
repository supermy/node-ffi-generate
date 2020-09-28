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

	const result = await execa(ffiGenerate, [
		"--file",
		`${__filename}.h`,
		"--library",
		"does-not-matter",
		"--prefix",
		"good",
	], {
		env: {
			PATH: `${join(__dirname, "failing-git")}:${process.env.PATH}`,
		},
	});
	const generated = result.stdout;

	await writeFile(__filename + ".output.js", generated);

	t.assert(!generated.includes("UNMAPPED"));

	t.assert(generated.includes("git commit (no git describe) on branch (no git branch)"));
});
