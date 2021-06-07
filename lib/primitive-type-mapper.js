// Copyright 2011, 2012, 2013, 2014 Timothy J Fontaine <tjfontaine@gmail.com>
// Copyright 2020, 2021 Joel Purra <https://joelpurra.com/>
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

const Debug = require("debug");
const {
	TypeKind,
	libclang,
} = require("@ffi-packager/libclang");

const primitiveTypeMapper = (typeKind) => {
	const debug = new Debug("ffi-generate:type-mapper");

	let returnValue;

	switch (typeKind) {
		case TypeKind.Void:
			returnValue = "ref.types.void";
			break;
		case TypeKind.Bool:
			returnValue = "ref.types.byte";
			break;
		case TypeKind.Char_U:
		case TypeKind.UChar:
			returnValue = "ref.types.uchar";
			break;
		case TypeKind.UShort:
			returnValue = "ref.types.ushort";
			break;
		case TypeKind.UInt:
			returnValue = "ref.types.uint32";
			break;
		case TypeKind.ULong:
			returnValue = "ref.types.ulong";
			break;
		case TypeKind.ULongLong:
			returnValue = "ref.types.ulonglong";
			break;
		case TypeKind.Char_S:
		case TypeKind.SChar:
			returnValue = "ref.types.char";
			break;
		case TypeKind.Short:
			returnValue = "ref.types.short";
			break;
		case TypeKind.Int:
			returnValue = "ref.types.int32";
			break;
		case TypeKind.Long:
			returnValue = "ref.types.long";
			break;
		case TypeKind.LongLong:
			returnValue = "ref.types.longlong";
			break;
		case TypeKind.Float:
			returnValue = "ref.types.float";
			break;
		case TypeKind.Double:
			returnValue = "ref.types.double";
			break;
		default:
			debug("No primitive type mapping found.", typeKind, libclang.constants.CXTypeKind[typeKind]);
			returnValue = undefined;
			break;
	}

	return returnValue;
};

module.exports = primitiveTypeMapper;
