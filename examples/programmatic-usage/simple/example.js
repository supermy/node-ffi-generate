// Example: generate javascript for the libclang header file.
/* eslint-disable no-console */
const {
	join,
} = require("path");
const {
	generate,
} = require("../../..");

const headerFilePath = join(__dirname, "mylibrary.h");

const result = generate({
	filename: headerFilePath,
	library: "mylibrary",
});

// NOTE: write javascript output to stdout.
console.log(result.serialized);
