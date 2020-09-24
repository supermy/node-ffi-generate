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
		library: "does-not-matter",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.deepEqual(generated.unmapped, []);

	// NOTE: not necessary to generate the pointer version?
	const expectedTypes = `const my_types = Struct({
		my_void: voidPtr,
		my_size_t: ref.types.ulong,
		my_uchar: ref.types.uchar,
		my_ushort: ref.types.ushort,
		my_uint32: ref.types.uint32,
		my_ulong: ref.types.ulong,
		my_ulonglong: ref.types.ulonglong,
		my_char: ref.types.char,
		my_short: ref.types.short,
		my_int32: ref.types.int32,
		my_long: ref.types.long,
		my_longlong: ref.types.longlong,
		my_float: ref.types.float,
		my_double: ref.types.double,
		my_unsigned_long_int: ref.types.ulong,
		my_unsigned_short_int: ref.types.ushort,
		my_unsigned_int: ref.types.uint32,
		my_int8_t: ref.types.char,
		my_int16_t: ref.types.short,
		my_int32_t: ref.types.int32,
		my_int64_t: ref.types.long,
		my_uint8_t: ref.types.uchar,
		my_uint16_t: ref.types.ushort,
		my_uint32_t: ref.types.uint32,
		my_uint64_t: ref.types.ulong,
	  });
	  const my_typesPtr = ref.refType(my_types);`;

	assertExpectedLines(t, expectedTypes, generated.serialized);

	const expectedFunctions = "do_stuff: [ref.types.void, [my_types]],";

	assertExpectedLines(t, expectedFunctions, generated.serialized);
});
