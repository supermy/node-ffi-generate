// Example: generate javascript for a simple header file.
/* eslint-disable no-console */
const {
	join,
} = require("path");
const {
	generate,
} = require("../../..");

const main = async () => {
	const headerFilePath = join(__dirname, "mylibrary.h");

	const result = await generate({
		filename: headerFilePath,
		library: "mylibrary",
	});

	// NOTE: write javascript output to stdout.
	console.log(result.serialized);
};

main();
