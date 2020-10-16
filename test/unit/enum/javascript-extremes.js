const test = require("ava");
const fs = require("fs");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../../helper/assert-expected-lines");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const {
		generate,
	} = require("../../..");

	const generated = await generate({
		filepath: `${__filename}.h`,
		library: "does-not-matter",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.deepEqual(generated.unmapped, []);

	const expectedConstants = `const constants = {
		my_enum: {
			FIRST: 0,
			MIN_SAFE_INTEGER_PLUS_ONE: -9007199254740990,
			MAX_SAFE_INTEGER_MINUS_ONE: 9007199254740990,
			MIN_SAFE_INTEGER: -9007199254740991,
			MAX_SAFE_INTEGER: 9007199254740991,
			MIN_SAFE_INTEGER_MINUS_ONE: -9007199254740992,
			MAX_SAFE_INTEGER_PLUS_ONE: 9007199254740992,
			JS_MIN_INT: -9007199254740992,
			JS_MAX_INT: 9007199254740992,
			JS_MIN_INT_MINUS_ONE: "-9007199254740993",
			JS_MAX_INT_PLUS_ONE: "9007199254740993",
			JS_MIN_INT_MINUS_TWO: "-9007199254740994",
			JS_MAX_INT_PLUS_TWO: "9007199254740994",
			0: "FIRST",
			"-9007199254740990": "MIN_SAFE_INTEGER_PLUS_ONE",
			9007199254740990: "MAX_SAFE_INTEGER_MINUS_ONE",
			"-9007199254740991": "MIN_SAFE_INTEGER",
			9007199254740991: "MAX_SAFE_INTEGER",
			"-9007199254740992": "MIN_SAFE_INTEGER_MINUS_ONE",
			9007199254740992: "MAX_SAFE_INTEGER_PLUS_ONE",
			"-9007199254740992": "JS_MIN_INT",
			9007199254740992: "JS_MAX_INT",
			"-9007199254740993": "JS_MIN_INT_MINUS_ONE",
			"9007199254740993": "JS_MAX_INT_PLUS_ONE",
			"-9007199254740994": "JS_MIN_INT_MINUS_TWO",
			9007199254740994: "JS_MAX_INT_PLUS_TWO",
		},
	  };`;

	assertExpectedLines(t, expectedConstants, generated.serialized);

	// TODO: where is uchar coming from?
	// TODO: refer to constants.my_enum instead of a number type?
	const expectedTypes = `
		const js_uchar = ref.types.uchar;
		const js_void = ref.types.void;
		const js_long = ref.types.long;
		const my_enum_t = js_long;
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_enum_t]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
