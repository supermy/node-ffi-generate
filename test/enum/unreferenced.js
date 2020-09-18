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

	const expected = `my_enum: {
	  FIRST: 0,
	  SECOND: -1,
	  LAST: 99,
	  0: "FIRST",
	  "-1": "SECOND",
	  99: "LAST",
	}`;

	assertExpectedLines(t, expected, generated.serialized);
});
