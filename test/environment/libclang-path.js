const test = require("ava");

test("libclang path", (t) => {
	// NOTE: does not actually check for the library, but that LD_LIBRARY_PATH/DYLD_LIBRARY_PATH has been set.
	// LD_LIBRARY_PATH=\"$(llvm-config --libdir)\" npm run --silent test
	const ldLibraryPath = process.platform === "darwin" ? process.env.DYLD_LIBRARY_PATH : process.env.LD_LIBRARY_PATH;

	t.is(typeof ldLibraryPath, "string");
});
