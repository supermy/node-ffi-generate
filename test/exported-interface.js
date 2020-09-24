const test = require("ava");

test("exported interface", (t) => {
	const exported = require("..");

	t.deepEqual(
		Object.keys(exported),
		[
			"generate",
		],
	);
	t.is(typeof exported.generate, "function");
});
