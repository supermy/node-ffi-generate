
const findMatchingLineNumber = (t, lines, start, find) => {
	t.is(typeof lines, "string");
	t.assert(lines.length > 0);
	t.is(typeof start, "number");
	t.assert(start >= 0);
	t.is(typeof find, "string");

	const matchingOffsetLine = lines.split("\n")
		.slice(start)
		.findIndex((serializedLine) => (serializedLine.includes(find)));

	if (matchingOffsetLine === -1) {
		return -1;
	}

	const adjustedLineNumber = start + matchingOffsetLine;

	return adjustedLineNumber;
};

const assertExpectedLines = (t, expected, serialized) => {
	t.is(typeof expected, "string");
	t.assert(expected.length > 0);
	t.is(typeof serialized, "string");
	t.assert(serialized.length > 0);

	// NOTE: trimming to allow for linebreaks before/after the contents.
	const expectedLines = expected.trim().split("\n");
	const trimmedFirstLine = expectedLines[0].trim();

	let nextExpectedLineNumber = findMatchingLineNumber(t, serialized, 0, trimmedFirstLine);

	t.assert(nextExpectedLineNumber >= 0, `First line was not found: ${JSON.stringify(trimmedFirstLine)}`);

	expectedLines.forEach((expectedLine) => {
		const trimmedExpectedLine = expectedLine.trim();
		const matchingLineNumber = findMatchingLineNumber(t, serialized, nextExpectedLineNumber, trimmedExpectedLine);
		const unexpectedLine = serialized.split("\n")[nextExpectedLineNumber];
		const trimmedUnexpectedLine = typeof unexpectedLine === "string" ? unexpectedLine.trim() : unexpectedLine;

		if (matchingLineNumber !== nextExpectedLineNumber) {
			const message = `The expected line was not found on serialized line number ${nextExpectedLineNumber}, `
			+ (
				matchingLineNumber === -1
					? "nor on any line after that."
					: `instead it was found on ${matchingLineNumber}.`
			);

			// NOTE: expects consecutive lines.
			t.is(trimmedExpectedLine, trimmedUnexpectedLine, message);
		}

		nextExpectedLineNumber = matchingLineNumber + 1;
	});
};

module.exports = assertExpectedLines;
