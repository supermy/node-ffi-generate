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
		filename: `${__filename}.h`,
		library: "simple",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.is(generated.unmapped.length, 0);

	// const expected = `simple: {
	//   FIRST: 0,
	//   SECOND: -1,
	//   LAST: 99,
	//   0: "FIRST",
	//   "-1": "SECOND",
	//   99: "LAST",
	// }`;

	const expected = "const constants = {};";

	assertExpectedLines(t, expected, generated.serialized);
});
