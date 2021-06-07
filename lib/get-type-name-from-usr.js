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

const assert = require("assert");

const getTypeNameFromUSR = (usr) => {
	assert.strictEqual(typeof usr, "string");

	// HACK: the Unified Symbol Resolution (USR) seems to be undocumented, but values are easy enough to break apart.
	// TODO: perform proper name lookups at the caller site instead.
	// Enum (type)
	// c:@EA@CXIdxEntityLanguage
	// Enum (value)
	// c:@EA@CXIdxEntityLanguage@CXIdxEntityLang_Swift
	// https://github.com/llvm/llvm-project/blob/ecd682bbf5e69e8690b7e3634258f05ae0a70448/clang/lib/Index/USRGeneration.cpp
	const parts = usr.split("@");

	return parts.slice(2).join("___");
};

module.exports = getTypeNameFromUSR;

