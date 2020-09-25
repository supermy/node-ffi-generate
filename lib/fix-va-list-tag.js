// Copyright 2011, 2012, 2013, 2014 Timothy J Fontaine <tjfontaine@gmail.com>
// Copyright 2020 Joel Purra <https://joelpurra.com/>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE

const {
	findIndex,
} = require("lodash");

const TypeWrapper = require("./wrappers/type-wrapper");

const fixVaListTag = (toRender) => {
	// HACK: post-traversal workaround for __va_list_tag issue found in zlib/1.2.11.
	// TODO: should the fix be general, or specifically applied to zlib?
	/* eslint-disable camelcase */
	const __va_list_tagIndex = findIndex(toRender.types, (type) => type.name === "__va_list_tag");

	if (__va_list_tagIndex !== -1) {
		// NOTE: __va_list_tag can be either an array or a pointer to an array (of its own type).
		// https://stackoverflow.com/questions/3369588/pass-va-list-or-pointer-to-va-list
		// This hack prevents a recursive type (re)definition in the generated output by just using the "unknown type" voidPtr.
		// const __va_list_tag = ArrayType(__va_list_tag, 1);
		// Desired output:
		// const __va_list_tag = voidPtr;
		const __va_list_tagType = new TypeWrapper("__va_list_tag");
		// TODO: don't map directly to the "rendered" string output.
		__va_list_tagType.type = "voidPtr";
		toRender.types[__va_list_tagIndex] = __va_list_tagType;
	}
	/* eslint-enable camelcase */
};

module.exports = fixVaListTag;
