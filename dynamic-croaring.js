/*
 * This file was automatically generated. It is better to run the generator again, than to manually edit.
 *
 * @ffi-packager/ffi-generate v2.0.2
 * - git commit v2.0.2-9-g071369d-dirty on branch (no git branch)
 * - Homebrew clang version 12.0.0
 * https://github.com/node-ffi-packager/node-ffi-generate
 *
 * File:
 * - Name: "roaring.h"
 * - SHA256: 4c093ddf2ef684250325f822701dff4420f546662f9ce3bd2195807f611a86fe
 *
 * Generator options:
 * - Library: "libroaring"
 * - Single file: false
 * - Prefixes: []
 * - Compiler arguments: ["-I/Users/moyong/project/CRoaring/include/","-I/usr/local//Cellar/llvm/12.0.0_1/lib/clang/12.0.0/include/"]
 */

const FFI = require("ffi-napi");
const ref = require("ref-napi");
const ArrayType = require("ref-array-di")(ref);
const Struct = require("ref-struct-di")(ref);
const Union = require("ref-union-di")(ref);

const constants = {
  "ROARING_VERSION_MAJOR": {
      ROARING_VERSION_MAJOR: 0,
      ROARING_VERSION_MINOR: 4,
      ROARING_VERSION_REVISION: 0,
      "0": "ROARING_VERSION_MAJOR",
      "4": "ROARING_VERSION_MINOR",
      "0": "ROARING_VERSION_REVISION",
  },
};

// NOTE: defining individual types as "global" constants to be able to reference them without any prefix.
const types = {};

const js_uchar = ref.types.uchar;
const js_int32 = ref.types.int32;
const int32_t = js_int32;
const js_void = ref.types.void;
const js_voidPointer = ref.refType(js_void);
const js_ushort = ref.types.ushort;
const uint16_t = js_ushort;
const uint16_tPointer = ref.refType(uint16_t);
const uint8_t = js_uchar;
const uint8_tPointer = ref.refType(uint8_t);
const roaring_array_s = Struct({
  size: int32_t,
  allocation_size: int32_t,
  containers: js_voidPointer,
  keys: uint16_tPointer,
  typecodes: uint8_tPointer,
  flags: uint8_t,
})
;
const roaring_array_t = roaring_array_s;
const roaring_bitmap_s = Struct({
  high_low_container: roaring_array_t,
})
;
const roaring_bitmap_t = roaring_bitmap_s;
const roaring_bitmap_tPointer = ref.refType(roaring_bitmap_t);
const js_uint32 = ref.types.uint32;
const uint32_t = js_uint32;
const js_byte = ref.types.byte;
const js_ulonglong = ref.types.ulonglong;
const uint64_t = js_ulonglong;
const js_ulong = ref.types.ulong;
const size_t = js_ulong;
const uint32_tPointer = ref.refType(uint32_t);
const js_double = ref.types.double;
const js_CString = ref.types.CString;
const roaring_iterator = FFI.Function(ref.types.byte, [
  js_uint32,
  js_voidPointer,
])
;
const roaring_iterator64 = FFI.Function(ref.types.byte, [
  js_ulonglong,
  js_voidPointer,
])
;
const roaring_statistics_s = Struct({
  n_containers: uint32_t,
  n_array_containers: uint32_t,
  n_run_containers: uint32_t,
  n_bitset_containers: uint32_t,
  n_values_array_containers: uint32_t,
  n_values_run_containers: uint32_t,
  n_values_bitset_containers: uint32_t,
  n_bytes_array_containers: uint32_t,
  n_bytes_run_containers: uint32_t,
  n_bytes_bitset_containers: uint32_t,
  max_value: uint32_t,
  min_value: uint32_t,
  sum_value: uint64_t,
  cardinality: uint64_t,
})
;
const roaring_statistics_t = roaring_statistics_s;
const roaring_statistics_tPointer = ref.refType(roaring_statistics_t);
const roaring_uint32_iterator_s = Struct({
  parent: roaring_bitmap_tPointer,
  container_index: int32_t,
  in_container_index: int32_t,
  run_index: int32_t,
  current_value: uint32_t,
  has_value: js_byte,
  container: js_voidPointer,
  typecode: uint8_t,
  highbits: uint32_t,
})
;
const roaring_uint32_iterator_t = roaring_uint32_iterator_s;
const roaring_uint32_iterator_tPointer = ref.refType(roaring_uint32_iterator_t);

types["int32_t"] = int32_t;
types["js_CString"] = js_CString;
types["js_byte"] = js_byte;
types["js_double"] = js_double;
types["js_int32"] = js_int32;
types["js_uchar"] = js_uchar;
types["js_uint32"] = js_uint32;
types["js_ulong"] = js_ulong;
types["js_ulonglong"] = js_ulonglong;
types["js_ushort"] = js_ushort;
types["js_void"] = js_void;
types["js_voidPointer"] = js_voidPointer;
types["roaring_array_s"] = roaring_array_s;
types["roaring_array_t"] = roaring_array_t;
types["roaring_bitmap_s"] = roaring_bitmap_s;
types["roaring_bitmap_t"] = roaring_bitmap_t;
types["roaring_bitmap_tPointer"] = roaring_bitmap_tPointer;
types["roaring_iterator"] = roaring_iterator;
types["roaring_iterator64"] = roaring_iterator64;
types["roaring_statistics_s"] = roaring_statistics_s;
types["roaring_statistics_t"] = roaring_statistics_t;
types["roaring_statistics_tPointer"] = roaring_statistics_tPointer;
types["roaring_uint32_iterator_s"] = roaring_uint32_iterator_s;
types["roaring_uint32_iterator_t"] = roaring_uint32_iterator_t;
types["roaring_uint32_iterator_tPointer"] = roaring_uint32_iterator_tPointer;
types["size_t"] = size_t;
types["uint16_t"] = uint16_t;
types["uint16_tPointer"] = uint16_tPointer;
types["uint32_t"] = uint32_t;
types["uint32_tPointer"] = uint32_tPointer;
types["uint64_t"] = uint64_t;
types["uint8_t"] = uint8_t;
types["uint8_tPointer"] = uint8_tPointer;

const functions = new FFI.Library("libroaring", {
  roaring_advance_uint32_iterator: [js_byte, [
    roaring_uint32_iterator_tPointer,
  ]],
  roaring_bitmap_add: [js_void, [
    roaring_bitmap_tPointer,
    uint32_t,
  ]],
  roaring_bitmap_add_checked: [js_byte, [
    roaring_bitmap_tPointer,
    uint32_t,
  ]],
  roaring_bitmap_add_many: [js_void, [
    roaring_bitmap_tPointer,
    size_t,
    uint32_tPointer,
  ]],
  roaring_bitmap_add_range_closed: [js_void, [
    roaring_bitmap_tPointer,
    uint32_t,
    uint32_t,
  ]],
  roaring_bitmap_and: [roaring_bitmap_tPointer, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_and_cardinality: [uint64_t, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_and_inplace: [js_void, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_andnot: [roaring_bitmap_tPointer, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_andnot_cardinality: [uint64_t, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_andnot_inplace: [js_void, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_clear: [js_void, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_contains: [js_byte, [
    roaring_bitmap_tPointer,
    uint32_t,
  ]],
  roaring_bitmap_contains_range: [js_byte, [
    roaring_bitmap_tPointer,
    uint64_t,
    uint64_t,
  ]],
  roaring_bitmap_copy: [roaring_bitmap_tPointer, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_create_with_capacity: [roaring_bitmap_tPointer, [
    uint32_t,
  ]],
  roaring_bitmap_deserialize: [roaring_bitmap_tPointer, [
    js_voidPointer,
  ]],
  roaring_bitmap_equals: [js_byte, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_flip: [roaring_bitmap_tPointer, [
    roaring_bitmap_tPointer,
    uint64_t,
    uint64_t,
  ]],
  roaring_bitmap_flip_inplace: [js_void, [
    roaring_bitmap_tPointer,
    uint64_t,
    uint64_t,
  ]],
  roaring_bitmap_free: [js_void, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_from_range: [roaring_bitmap_tPointer, [
    uint64_t,
    uint64_t,
    uint32_t,
  ]],
  roaring_bitmap_frozen_serialize: [js_void, [
    roaring_bitmap_tPointer,
    js_CString,
  ]],
  roaring_bitmap_frozen_size_in_bytes: [size_t, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_frozen_view: [roaring_bitmap_tPointer, [
    js_CString,
    size_t,
  ]],
  roaring_bitmap_get_cardinality: [uint64_t, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_init_with_capacity: [js_byte, [
    roaring_bitmap_tPointer,
    uint32_t,
  ]],
  roaring_bitmap_intersect: [js_byte, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_intersect_with_range: [js_byte, [
    roaring_bitmap_tPointer,
    uint64_t,
    uint64_t,
  ]],
  roaring_bitmap_is_empty: [js_byte, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_is_strict_subset: [js_byte, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_is_subset: [js_byte, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_jaccard_index: [js_double, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_lazy_or: [roaring_bitmap_tPointer, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
    js_byte,
  ]],
  roaring_bitmap_lazy_or_inplace: [js_void, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
    js_byte,
  ]],
  roaring_bitmap_lazy_xor: [roaring_bitmap_tPointer, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_lazy_xor_inplace: [js_void, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_maximum: [uint32_t, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_minimum: [uint32_t, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_of: [roaring_bitmap_tPointer, [
    size_t,
  ]],
  roaring_bitmap_of_ptr: [roaring_bitmap_tPointer, [
    size_t,
    uint32_tPointer,
  ]],
  roaring_bitmap_or: [roaring_bitmap_tPointer, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_or_cardinality: [uint64_t, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_or_inplace: [js_void, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_or_many: [roaring_bitmap_tPointer, [
    size_t,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_or_many_heap: [roaring_bitmap_tPointer, [
    uint32_t,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_overwrite: [js_byte, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_portable_deserialize: [roaring_bitmap_tPointer, [
    js_CString,
  ]],
  roaring_bitmap_portable_deserialize_safe: [roaring_bitmap_tPointer, [
    js_CString,
    size_t,
  ]],
  roaring_bitmap_portable_deserialize_size: [size_t, [
    js_CString,
    size_t,
  ]],
  roaring_bitmap_portable_serialize: [size_t, [
    roaring_bitmap_tPointer,
    js_CString,
  ]],
  roaring_bitmap_portable_size_in_bytes: [size_t, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_printf: [js_void, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_printf_describe: [js_void, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_range_cardinality: [uint64_t, [
    roaring_bitmap_tPointer,
    uint64_t,
    uint64_t,
  ]],
  roaring_bitmap_range_uint32_array: [js_byte, [
    roaring_bitmap_tPointer,
    size_t,
    size_t,
    uint32_tPointer,
  ]],
  roaring_bitmap_rank: [uint64_t, [
    roaring_bitmap_tPointer,
    uint32_t,
  ]],
  roaring_bitmap_remove: [js_void, [
    roaring_bitmap_tPointer,
    uint32_t,
  ]],
  roaring_bitmap_remove_checked: [js_byte, [
    roaring_bitmap_tPointer,
    uint32_t,
  ]],
  roaring_bitmap_remove_many: [js_void, [
    roaring_bitmap_tPointer,
    size_t,
    uint32_tPointer,
  ]],
  roaring_bitmap_remove_range_closed: [js_void, [
    roaring_bitmap_tPointer,
    uint32_t,
    uint32_t,
  ]],
  roaring_bitmap_remove_run_compression: [js_byte, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_repair_after_lazy: [js_void, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_run_optimize: [js_byte, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_select: [js_byte, [
    roaring_bitmap_tPointer,
    uint32_t,
    uint32_tPointer,
  ]],
  roaring_bitmap_serialize: [size_t, [
    roaring_bitmap_tPointer,
    js_CString,
  ]],
  roaring_bitmap_shrink_to_fit: [size_t, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_size_in_bytes: [size_t, [
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_statistics: [js_void, [
    roaring_bitmap_tPointer,
    roaring_statistics_tPointer,
  ]],
  roaring_bitmap_to_uint32_array: [js_void, [
    roaring_bitmap_tPointer,
    uint32_tPointer,
  ]],
  roaring_bitmap_xor: [roaring_bitmap_tPointer, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_xor_cardinality: [uint64_t, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_xor_inplace: [js_void, [
    roaring_bitmap_tPointer,
    roaring_bitmap_tPointer,
  ]],
  roaring_bitmap_xor_many: [roaring_bitmap_tPointer, [
    size_t,
    roaring_bitmap_tPointer,
  ]],
  roaring_copy_uint32_iterator: [roaring_uint32_iterator_tPointer, [
    roaring_uint32_iterator_tPointer,
  ]],
  roaring_create_iterator: [roaring_uint32_iterator_tPointer, [
    roaring_bitmap_tPointer,
  ]],
  roaring_free_uint32_iterator: [js_void, [
    roaring_uint32_iterator_tPointer,
  ]],
  roaring_init_iterator: [js_void, [
    roaring_bitmap_tPointer,
    roaring_uint32_iterator_tPointer,
  ]],
  roaring_init_iterator_last: [js_void, [
    roaring_bitmap_tPointer,
    roaring_uint32_iterator_tPointer,
  ]],
  roaring_iterate: [js_byte, [
    roaring_bitmap_tPointer,
    roaring_iterator,
    js_voidPointer,
  ]],
  roaring_iterate64: [js_byte, [
    roaring_bitmap_tPointer,
    roaring_iterator64,
    uint64_t,
    js_voidPointer,
  ]],
  roaring_move_uint32_iterator_equalorlarger: [js_byte, [
    roaring_uint32_iterator_tPointer,
    uint32_t,
  ]],
  roaring_previous_uint32_iterator: [js_byte, [
    roaring_uint32_iterator_tPointer,
  ]],
  roaring_read_uint32_iterator: [uint32_t, [
    roaring_uint32_iterator_tPointer,
    uint32_tPointer,
    uint32_t,
  ]],
});

module.exports = {
  constants,
  types,
  functions,
};

