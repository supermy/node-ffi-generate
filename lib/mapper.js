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

const Debug = require("debug");
const {
	normalize,
} = require("path");
const assert = require("assert");
const {
	ChildVisitResult,
	Cursor,
	CursorKind,
	Index,
	TranslationUnit,
	Type,
	TypeKind,
	libclang,
} = require("@ffi-packager/libclang");
const {
	sortBy,
} = require("lodash");

const EnumValueWrapper = require("./wrappers/enum-value-wrapper");
const FunctionWrapper = require("./wrappers/function-wrapper");
const getTypeNameFromUSR = require("./get-type-name-from-usr");
const matchPrefix = require("./match-prefix");
const primitiveTypeMapper = require("./primitive-type-mapper");
const TypeWrapper = require("./wrappers/type-wrapper");

const mapper = async (options, templates) => {
	const debug = new Debug("ffi-generate:mapper");

	const toRender = {
		enums: undefined,
		functions: [],
		library: options.library,
		sorted: {
			enums: [],
			functions: [],
			types: [],
		},
		types: [],
	};

	const unmapped = [];
	const typeLookup = {};
	const enumLookup = {};
	let anonymousTypeCount = 0;

	const registerType = (typeWrapper) => {
		assert(typeWrapper, JSON.stringify(typeWrapper));
		assert.strictEqual(typeof typeWrapper, "object", JSON.stringify(typeWrapper));
		assert.strictEqual(typeof typeWrapper.name, "string", JSON.stringify(typeWrapper));
		assert(typeWrapper.name.length > 0, JSON.stringify(typeWrapper));
		assert.strictEqual(typeof typeWrapper.renderedType, "string", JSON.stringify(typeWrapper));
		assert(typeWrapper.renderedType.length > 0, JSON.stringify(typeWrapper));
		assert.strictEqual(typeof typeWrapper.typeReference, "string", JSON.stringify(typeWrapper));
		assert(typeWrapper.typeReference.length > 0, JSON.stringify(typeWrapper));

		if (typeLookup[typeWrapper.typeReference]) {
			debug("Type already defined.", typeWrapper.typeReference);

			return undefined;
		}

		// TODO: don't keep two copies of types/structs.
		toRender.types.push(typeWrapper);
		typeLookup[typeWrapper.typeReference] = typeWrapper;
	};

	const index = new Index(true, true);
	const translationUnit = TranslationUnit.fromSource(index, options.filepath, options.compilerArgs);

	const defineAlias = function (typedefCursor) {
		assert(typedefCursor instanceof Cursor);
		assert.strictEqual(typedefCursor.kind, CursorKind.TypedefDecl);

		const name = typedefCursor.spelling;

		assert.strictEqual(typeof name, "string");
		assert(name.length > 0);

		const aliasedMappedType = mapType(typedefCursor.typedefType);
		const aliasWrapper = new TypeWrapper(name, aliasedMappedType.typeReference, name);

		// TODO: do not both add and return type.
		registerType(aliasWrapper);

		return aliasWrapper;
	};

	const defineType = function (cursor) {
		assert(cursor instanceof Cursor);
		assert(cursor.kind === CursorKind.StructDecl || cursor.kind === CursorKind.UnionDecl);

		let name = cursor.spelling;

		if (!name) {
			name = getTypeNameFromUSR(cursor.usr);
		}

		// NOTE: for some reason (this.isAnonymous || this.isAnonymousRecordDecl) does not work on struct/union cursors. Perhaps only on FieldDecl?
		// HACK: parse the USR.
		if (name.endsWith("___Sa") || name.endsWith("___Ua")) {
			// NOTE: the anonymous counter depends on the visited order.
			name += `_${anonymousTypeCount++}`;

			debug("Generated anonymous type name.", "USR", JSON.stringify(cursor.usr), "name", JSON.stringify(name));
		}

		assert.strictEqual(typeof name, "string", `${cursor.kind} ${libclang.constants.CXCursorKind[cursor.kind]}`);
		assert(name.length > 0);

		let typeWrapper = typeLookup[name];

		if (typeWrapper) {
			return typeWrapper;
		}

		typeWrapper = new TypeWrapper(name, undefined, name);

		const referencedVisitor = function (parent) {
			let fieldType;
			let fieldName;

			switch (this.kind) {
				case CursorKind.StructDecl:
				case CursorKind.UnionDecl:
					fieldName = this.isAnonymousRecordDecl ? `anonymous_${typeWrapper.anonymousCount++}` : this.spelling;
					fieldType = defineType(this);
					break;

				case CursorKind.FieldDecl:
				case CursorKind.ParmDecl:
					fieldName = this.spelling;
					fieldType = mapType(this.type);
					break;

				default:
					break;
			}

			if (fieldType) {
				typeWrapper.fields.push(new TypeWrapper(
					fieldName,
					fieldType.renderedType,
					fieldType.typeReference,
				));

				return ChildVisitResult.Continue;
			}

			typeWrapper.abort = {
				parent: {
					kind: {
						code: parent.kind,
						name: libclang.constants.CXCursorKind[parent.kind],
					},
					spelling: parent.spelling,
					type: {
						kind: parent.type.kind,
						spelling: parent.type.spelling,
					},
				},
				reason: "Could not map inner type.",
				self: {
					kind: {
						code: this.kind,
						name: libclang.constants.CXCursorKind[this.kind],
					},
					spelling: this.spelling,
					type: {
						kind: this.type.kind,
						spelling: this.type.spelling,
					},
				},
			};

			// TODO: only push to unmapped at the top level?
			unmapped.push(typeWrapper.abort);

			return ChildVisitResult.Continue;
		};

		cursor.referenced.canonical.visitChildren(referencedVisitor);

		if (typeWrapper.fields.length === 0) {
			// TODO: avoid special case.
			const opaqueTypeForEmpty = defineOpaque(cursor);
			typeWrapper.renderedType = opaqueTypeForEmpty.typeReference;
			typeWrapper.opaque = true;
		} else {
			switch (cursor.kind) {
				case CursorKind.UnionDecl:
					typeWrapper.renderedType = templates.Union.render(typeWrapper);
					break;

				case CursorKind.StructDecl:
					typeWrapper.renderedType = templates.Struct.render(typeWrapper);
					break;

				default:
					throw new Error(`Previously asserted cursor kind has changed: ${cursor.kind} ${libclang.constants.CXCursorKind[cursor.kind]}`);
			}
		}

		// TODO: do not both add and return type.
		registerType(typeWrapper);

		return typeWrapper;
	};

	const mapEnum = (enumCursor, enumValueType) => {
		assert(enumCursor instanceof Cursor);
		assert(enumValueType instanceof TypeWrapper);

		function mapEnumVisitor(parent) {
			let enumName = parent.spelling;

			if (enumName === "") {
				enumName = getTypeNameFromUSR(parent.usr);
			}

			assert.strictEqual(typeof enumName, "string");
			assert(enumName.length > 0);

			let enumObject = enumLookup[enumName];

			if (!enumObject) {
				enumObject = {};
				enumLookup[enumName] = enumObject;
			}

			const previousEnumValueWrapper = enumObject[this.spelling];

			// TODO: don't rely on the string representation of type references.
			const isUnsignedEnum = parent.enumType.spelling.startsWith("U");
			const value = isUnsignedEnum ? this.enumUValue : this.enumValue;

			// NOTE: ref-napi returns strings for numbers outside of javascript's range, so using the stringified representation.
			// https://github.com/node-ffi-napi/ref-napi/blob/b0809c25e5d9e4efa82ee6c323e1f961044b65e0/src/binding.cc#L66-L70
			// TODO: use javascript's BigInt.
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
			// NOTE: could also break traversal for "bad" numbers, instead of continuing with further enum values (and possibly the same enum value if the enum is referenced more than once).
			const enumValueWrapper = new EnumValueWrapper(
				`[[${this.spelling}]]`,
				JSON.stringify(value),
				value,
			);

			const shouldStoreEnumValue = !previousEnumValueWrapper || (previousEnumValueWrapper.renderedType !== enumValueWrapper.renderedType);

			if (shouldStoreEnumValue) {
				// NOTE: while redefining an enum value could happen, it seems libclang prevents visiting redefined values. Asserting to make sure this is stil lthe case.
				assert(!previousEnumValueWrapper);

				if (this.enumUValue !== this.enumValue) {
					debug(
						"Potentially mismatching unsigned/signed enum value.",
						parent.enumType.spelling,
						`(${enumValueType.typeReference})`,
						parent.spelling,
						this.spelling,
						`unsigned=${this.enumUValue}`,
						`signed=${this.enumValue}`,
					);
				}

				if (typeof value === "string") {
					debug(
						"Number is outside the safe javascript integer range, setting to string value.",
						parent.enumType.spelling,
						`(${enumValueType.typeReference})`,
						parent.spelling,
						this.spelling,
						"enumValueWrapper",
						enumValueWrapper,
					);
				}

				enumObject[this.spelling] = enumValueWrapper;
			}

			return ChildVisitResult.Continue;
		}

		enumCursor.referenced.canonical.visitChildren(mapEnumVisitor);
	};

	function definePrimitiveType(primitiveType) {
		assert.strictEqual(typeof primitiveType, "string");

		const primitiveTypeWrapper = new TypeWrapper(
			`[[${primitiveType}]]`,
			primitiveType,
			`js_${primitiveType.replace("ref.types.", "")}`,
		);

		// TODO: do not both add and return type.
		registerType(primitiveTypeWrapper);

		return primitiveTypeWrapper;
	}

	const definePrimitiveTypePointer = (primitiveType) => {
		assert.strictEqual(typeof primitiveType, "string");

		definePrimitiveType(primitiveType);

		const primitiveTypePointerWrapper = new TypeWrapper(
			`[[ref.refType(${primitiveType})]]`,
			`ref.refType(js_${primitiveType.replace("ref.types.", "")})`,
			`js_${primitiveType.replace("ref.types.", "")}Pointer`,
		);

		// TODO: do not both add and return type.
		registerType(primitiveTypePointerWrapper);

		return primitiveTypePointerWrapper;
	};

	const defineOpaque = (cursorOrType) => {
		assert(cursorOrType instanceof Cursor || cursorOrType instanceof Type);

		definePrimitiveTypePointer("ref.types.void");

		// TODO: reconsider the static opaque template.
		const opaqueType = new TypeWrapper(
			`[[${cursorOrType.spelling}]]`,
			"ref.refType(js_void)",
			"js_voidPointer",
		);
		opaqueType.opaque = true;

		// TODO: do not both add and return type.
		registerType(opaqueType);

		return opaqueType;
	};

	const defineFunction = (functionType) => {
		assert(functionType instanceof Type);

		// TODO: work on the function (declaration) cursor instead of function type?
		const functionReturnType = mapType(functionType.result);
		const functionArguments = [];

		for (let i = 0; i < functionType.numberOfArguments; i++) {
			const functionArgument = functionType.getArgument(i);
			const functionArgumentType = mapType(functionArgument);

			functionArguments.push(functionArgumentType);
		}

		const functionWrapper = new FunctionWrapper(functionReturnType, functionArguments);

		return functionWrapper;
	};

	const mapType = function (type) {
		// TODO: only map types, not cursors?
		assert(type instanceof Cursor || type instanceof Type);
		assert(type.kind !== 0);

		switch (type.kind) {
			case TypeKind.Typedef: {
				if (type.canonical.kind === TypeKind.Pointer && type.canonical.pointeeType.kind === TypeKind.FunctionProto) {
					const functionName = type.declaration.spelling;
					const functionWrapper = new TypeWrapper(`[[${functionName}]]`, undefined, functionName);
					const functionType = defineFunction(type.canonical.pointeeType);
					functionWrapper.renderedType = templates.Function.render(functionType);

					// TODO: do not both add and return type.
					registerType(functionWrapper);

					return functionWrapper;
				}

				return defineAlias(type.declaration);
			}

			case TypeKind.Enum: {
				const mappedType = mapType(type.declaration.enumType);
				mapEnum(type.declaration, mappedType);

				return mappedType;
			}

			case TypeKind.Pointer: {
				if (type.pointeeType.kind === TypeKind.Char_S) {
					const cstringTypeWrapper = new TypeWrapper(
						"[[ref.types.CString]]",
						"ref.types.CString",
						"js_CString",
					);

					// TODO: do not both add and return type.
					registerType(cstringTypeWrapper);

					return cstringTypeWrapper;
				}

				if (type.pointeeType.declaration.kind === CursorKind.TypedefDecl) {
					const aliasTypeWrapper = defineAlias(type.pointeeType.declaration);

					if (aliasTypeWrapper) {
						const aliasTypePointerWrapper = new TypeWrapper(
							`[[${aliasTypeWrapper.name}Pointer]]`,
							`ref.refType(${aliasTypeWrapper.typeReference})`,
							`${aliasTypeWrapper.typeReference}Pointer`,
						);

						// TODO: do not both add and return type.
						registerType(aliasTypePointerWrapper);

						return aliasTypePointerWrapper;
					}
				}

				const primitiveType = primitiveTypeMapper(type.pointeeType.canonical.kind);

				if (primitiveType) {
					return definePrimitiveTypePointer(primitiveType);
				}

				return mapType(type.pointeeType);
			}

			case TypeKind.ConstantArray: {
				const arrayElementType = mapType(type.elementType);
				const arrayTypeWrapper = new TypeWrapper(`[[${arrayElementType.name}[${type.arraySize}]]]`);

				arrayTypeWrapper.elementType = arrayElementType;
				arrayTypeWrapper.arrSize = type.arraySize;
				arrayTypeWrapper.renderedType = templates.Array.render(arrayTypeWrapper);
				arrayTypeWrapper.typeReference = `${arrayElementType.typeReference}_array_${type.arraySize}`;

				// TODO: do not both add and return type.
				registerType(arrayTypeWrapper);

				return arrayTypeWrapper;
			}

			case TypeKind.Record:
				return defineType(type.declaration);

			case TypeKind.Elaborated:
				return mapType(type.namedType);

			default: {
				const primitiveType = primitiveTypeMapper(type.kind);

				if (primitiveType) {
					return definePrimitiveType(primitiveType);
				}

				break;
			}
		}

		const abort = {
			reason: "Could not map unexpected/unhandled type kind, falling back to void pointer.",
			self: {
				kind: type.kind,
				spelling: type.spelling,
			},
		};

		// TODO: only push to unmapped at the top level?
		unmapped.push(abort);

		return defineOpaque(type);
	};

	const topLevelVisitor = function (_parent) {
		if (!matchPrefix(options.prefixes, this.spelling)) {
			return ChildVisitResult.Continue;
		}

		if (options.singleFile && normalize(this.location.presumedLocation.filename) !== options.filepath) {
			return ChildVisitResult.Continue;
		}

		switch (this.kind) {
			case CursorKind.FunctionDecl: {
				if (this.isInlined) {
					break;
				}

				const functionName = this.spelling;
				const functionTypeWrapper = new TypeWrapper(functionName, undefined, `{{${functionName}}}`);
				const functionType = defineFunction(this.type);
				functionTypeWrapper.returnType = functionType.returnType;
				functionTypeWrapper.args = functionType.args;

				toRender.functions.push(functionTypeWrapper);

				break;
			}

			case CursorKind.EnumDecl: {
				const enumValueType = mapType(this);
				mapEnum(this, enumValueType);

				break;
			}

			default:
				break;
		}

		return ChildVisitResult.Continue;
	};

	translationUnit.cursor.canonical.visitChildren(topLevelVisitor);

	translationUnit.dispose();
	index.dispose();

	toRender.enums = Object.entries(enumLookup).map(([
		enumDefinition,
		enumMaps,
	]) => ({
		name: enumDefinition,
		values: Object.entries(enumMaps).map(([
			enumName,
			enumValue,
		]) =>
			({
				name: enumName,
				value: enumValue,
			}),
		),
	}));

	toRender.sorted.enums = sortBy(toRender.enums, [
		"name",
	]);
	toRender.sorted.functions = sortBy(toRender.functions, [
		"name",
	]);
	toRender.sorted.types = sortBy(toRender.types, [
		"typeReference",
	]);

	const result = {
		toRender,
		unmapped,
	};

	return result;
};

module.exports = mapper;
