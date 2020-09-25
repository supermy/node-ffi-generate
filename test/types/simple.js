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

	const expectedTypes = `
		const js_void = ref.types.void;
		const js_voidPointer = ref.refType(ref.types.void);
		const js_ulong = ref.types.ulong;
		const js_uchar = ref.types.uchar;
		const js_ushort = ref.types.ushort;
		const js_uint32 = ref.types.uint32;
		const js_ulonglong = ref.types.ulonglong;
		const js_char = ref.types.char;
		const js_short = ref.types.short;
		const js_int32 = ref.types.int32;
		const js_long = ref.types.long;
		const js_longlong = ref.types.longlong;
		const js_float = ref.types.float;
		const js_double = ref.types.double;
		const my_types = Struct({
			my_void: js_voidPointer,
			my_size_t: js_ulong,
			my_uchar: js_uchar,
			my_ushort: js_ushort,
			my_uint32: js_uint32,
			my_ulong: js_ulong,
			my_ulonglong: js_ulonglong,
			my_char: js_char,
			my_short: js_short,
			my_int32: js_int32,
			my_long: js_long,
			my_longlong: js_longlong,
			my_float: js_float,
			my_double: js_double,
			my_unsigned_long_int: js_ulong,
			my_unsigned_short_int: js_ushort,
			my_unsigned_int: js_uint32,
			my_int8_t: js_char,
			my_int16_t: js_short,
			my_int32_t: js_int32,
			my_int64_t: js_long,
			my_uint8_t: js_uchar,
			my_uint16_t: js_ushort,
			my_uint32_t: js_uint32,
			my_uint64_t: js_ulong,
		});
	`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [js_void, [my_types]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
