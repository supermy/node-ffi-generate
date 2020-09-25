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

	// TODO: map enum also as a type, or reference the enum from the type?
	t.deepEqual(generated.unmapped, [
		{
			parent: {
				kind: {
					code: 20,
					name: "CXCursor_TypedefDecl",
				},
				spelling: "my_enum_t",
				type: {
					kind: 107,
					spelling: "Typedef",
				},
			},
			reason: "Could not map inner type.",
			self: {
				kind: {
					code: 5,
					name: "CXCursor_EnumDecl",
				},
				spelling: "my_enum",
				type: {
					kind: 106,
					spelling: "Enum",
				},
			},
		},
	]);

	const expectedConstants = `const constants = {
		my_enum: {
		  FIRST: 0,
		  SECOND: -1,
		  LAST: 99,
		  0: "FIRST",
		  "-1": "SECOND",
		  99: "LAST",
		},
	  };`;

	assertExpectedLines(t, expectedConstants, generated.serialized);

	// TODO: generate pointer type to the enum.
	const expectedTypes = `
		const js_uchar = ref.types.uchar;
		const js_void = ref.types.void;
		const my_enum_tPointer = ref.refType(my_enum_t);
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_enum_tPointer]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
