// Example: generate javascript for a simple header file.
/* eslint-disable no-console */
const {
	generate,
} = require("../../..");

const main = async () => {
	const headerFilePath = "mylibrary.h";

	const result = await generate({
		filepath: headerFilePath,
		library: "mylibrary",
	});

	// NOTE: write javascript output to stdout.
	console.log(result.serialized);
};

main();
