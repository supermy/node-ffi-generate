const test = require("ava");
const fs = require("fs");
const {
	join,
} = require("path");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../../helper/assert-expected-lines");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const {
		generate,
	} = require("../../..");

	const llvmIncludeDir = join(__dirname, "include");
	const headerFilePath = join(llvmIncludeDir, "clang-c", "Index.h");

	const generated = await generate({
		compilerArgs: [
			"--include-directory",
			llvmIncludeDir,
		],
		filepath: headerFilePath,
		library: "libclang",
		prefixes: [
			"clang_",
			"CX",
		],
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.deepEqual(generated.unmapped, [
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
		{
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: 111,
				spelling: "FunctionProto",
			},
		},
	]);

	const expected = (await readFile(__filename + ".expected.js")).toString();

	assertExpectedLines(t, expected, generated.serialized);
});
