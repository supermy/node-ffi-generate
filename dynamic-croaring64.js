/*
 * This file was automatically generated. It is better to run the generator again, than to manually edit.
 *
 * @ffi-packager/ffi-generate v2.0.2
 * - git commit v2.0.2-9-g071369d-dirty on branch (no git branch)
 * - Homebrew clang version 12.0.0
 * https://github.com/node-ffi-packager/node-ffi-generate
 *
 * File:
 * - Name: "roaring64map.hh"
 * - SHA256: 388cefcfd65cdde663cd4a038e983d686a4a529d48f6c5acd08c8ccde32eab10
 *
 * Generator options:
 * - Library: "libroaring"
 * - Single file: false
 * - Prefixes: []
 * - Compiler arguments: ["-I/Users/moyong/project/CRoaring/include/","-I/usr/local/Cellar/llvm/12.0.0_1/include/c++/v1/","-I/usr/local//Cellar/llvm/12.0.0_1/lib/clang/12.0.0/include/"]
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
  "align_val_t": {
      : "-9223372036854775808",
      "-9223372036854775808": "",
  },
  "croaring_instruction_set": {
      CROARING_DEFAULT: 0,
      CROARING_NEON: 1,
      CROARING_AVX2: 4,
      CROARING_SSE42: 8,
      CROARING_PCLMULQDQ: 16,
      CROARING_BMI1: 32,
      CROARING_BMI2: 64,
      CROARING_ALTIVEC: 128,
      CROARING_UNINITIALIZED: 32768,
      "0": "CROARING_DEFAULT",
      "1": "CROARING_NEON",
      "4": "CROARING_AVX2",
      "8": "CROARING_SSE42",
      "16": "CROARING_PCLMULQDQ",
      "32": "CROARING_BMI1",
      "64": "CROARING_BMI2",
      "128": "CROARING_ALTIVEC",
      "32768": "CROARING_UNINITIALIZED",
  },
  "idtype_t": {
      P_ALL: 0,
      P_PID: 1,
      P_PGID: 2,
      "0": "P_ALL",
      "1": "P_PID",
      "2": "P_PGID",
  },
  "memory_order": {
      memory_order_relaxed: 0,
      memory_order_consume: 1,
      memory_order_acquire: 2,
      memory_order_release: 3,
      memory_order_acq_rel: 4,
      memory_order_seq_cst: 5,
      "0": "memory_order_relaxed",
      "1": "memory_order_consume",
      "2": "memory_order_acquire",
      "3": "memory_order_release",
      "4": "memory_order_acq_rel",
      "5": "memory_order_seq_cst",
  },
  "qos_class_t": {
      QOS_CLASS_USER_INTERACTIVE: 33,
      QOS_CLASS_USER_INITIATED: 25,
      QOS_CLASS_DEFAULT: 21,
      QOS_CLASS_UTILITY: 17,
      QOS_CLASS_BACKGROUND: 9,
      QOS_CLASS_UNSPECIFIED: 0,
      "33": "QOS_CLASS_USER_INTERACTIVE",
      "25": "QOS_CLASS_USER_INITIATED",
      "21": "QOS_CLASS_DEFAULT",
      "17": "QOS_CLASS_UTILITY",
      "9": "QOS_CLASS_BACKGROUND",
      "0": "QOS_CLASS_UNSPECIFIED",
  },
};

// NOTE: defining individual types as "global" constants to be able to reference them without any prefix.
const types = {};

const js_uchar = ref.types.uchar;
const js_void = ref.types.void;
const js_voidPointer = ref.refType(js_void);
const js_ulong = ref.types.ulong;
const size_t = js_ulong;
const js_uint32 = ref.types.uint32;
const memory_order = js_uint32;
const js_byte = ref.types.byte;
const nanoseconds = js_voidPointer;

types["js_byte"] = js_byte;
types["js_uchar"] = js_uchar;
types["js_uint32"] = js_uint32;
types["js_ulong"] = js_ulong;
types["js_void"] = js_void;
types["js_voidPointer"] = js_voidPointer;
types["memory_order"] = memory_order;
types["nanoseconds"] = nanoseconds;
types["size_t"] = size_t;

const functions = new FFI.Library("libroaring", {
  __cxx_atomic_exchange: [js_voidPointer, [
    js_voidPointer,
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_exchange: [js_voidPointer, [
    js_voidPointer,
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_load: [js_voidPointer, [
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_load: [js_voidPointer, [
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_load: [js_voidPointer, [
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_store: [js_void, [
    js_voidPointer,
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_store: [js_void, [
    js_voidPointer,
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_store: [js_void, [
    js_voidPointer,
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_wait: [js_byte, [
    js_voidPointer,
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_wait: [js_byte, [
    js_voidPointer,
    js_voidPointer,
  ]],
  __cxx_atomic_wait: [js_byte, [
    js_voidPointer,
    js_voidPointer,
    memory_order,
  ]],
  __cxx_atomic_wait: [js_byte, [
    js_voidPointer,
    js_voidPointer,
  ]],
  __cxx_nonatomic_compare_equal: [js_byte, [
    js_voidPointer,
    js_voidPointer,
  ]],
  __do_deallocate_handle_size: [js_void, [
    js_voidPointer,
    size_t,
  ]],
  __libcpp_isinf: [js_byte, [
    js_voidPointer,
  ]],
  __libcpp_isinf: [js_byte, [
    js_voidPointer,
  ]],
  __libcpp_isinf: [js_byte, [
    js_voidPointer,
  ]],
  __libcpp_isnan: [js_byte, [
    js_voidPointer,
  ]],
  __libcpp_isnan: [js_byte, [
    js_voidPointer,
  ]],
  __libcpp_isnan: [js_byte, [
    js_voidPointer,
  ]],
  __libcpp_operator_delete: [js_void, [
    js_voidPointer,
  ]],
  __libcpp_operator_new: [js_voidPointer, [
    js_voidPointer,
  ]],
  __libcpp_thread_poll_with_backoff: [js_byte, [
    js_voidPointer,
    js_voidPointer,
    nanoseconds,
  ]],
  __libcpp_thread_poll_with_backoff: [js_byte, [
    js_voidPointer,
    js_voidPointer,
    nanoseconds,
  ]],
  __tree_balance_after_insert: [js_void, [
    js_voidPointer,
    js_voidPointer,
  ]],
  __tree_leaf: [js_voidPointer, [
    js_voidPointer,
  ]],
  __tree_left_rotate: [js_void, [
    js_voidPointer,
  ]],
  __tree_next: [js_voidPointer, [
    js_voidPointer,
  ]],
  __tree_remove: [js_void, [
    js_voidPointer,
    js_voidPointer,
  ]],
  __tree_right_rotate: [js_void, [
    js_voidPointer,
  ]],
  accumulate: [js_voidPointer, [
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
  ]],
  accumulate: [js_voidPointer, [
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
  ]],
  accumulate: [js_voidPointer, [
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
  ]],
  accumulate: [js_voidPointer, [
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
  ]],
  accumulate: [js_voidPointer, [
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
    js_voidPointer,
  ]],
  operator delete: [js_void, [
    js_voidPointer,
  ]],
  operator delete: [js_void, [
    js_voidPointer,
    js_voidPointer,
  ]],
  operator delete: [js_void, [
    js_voidPointer,
    size_t,
  ]],
  operator delete: [js_void, [
    js_voidPointer,
    size_t,
  ]],
  operator delete: [js_void, [
    js_voidPointer,
    size_t,
    js_voidPointer,
  ]],
  operator delete: [js_void, [
    js_voidPointer,
    size_t,
    size_t,
  ]],
  operator delete[]: [js_void, [
    js_voidPointer,
  ]],
  operator delete[]: [js_void, [
    js_voidPointer,
    js_voidPointer,
  ]],
  operator delete[]: [js_void, [
    js_voidPointer,
    size_t,
  ]],
  operator delete[]: [js_void, [
    js_voidPointer,
    size_t,
  ]],
  operator delete[]: [js_void, [
    js_voidPointer,
    size_t,
    js_voidPointer,
  ]],
  operator delete[]: [js_void, [
    js_voidPointer,
    size_t,
    size_t,
  ]],
  operator new: [js_voidPointer, [
    size_t,
  ]],
  operator new: [js_voidPointer, [
    size_t,
    js_voidPointer,
  ]],
  operator new: [js_voidPointer, [
    size_t,
    size_t,
  ]],
  operator new: [js_voidPointer, [
    size_t,
    size_t,
    js_voidPointer,
  ]],
  operator new[]: [js_voidPointer, [
    size_t,
  ]],
  operator new[]: [js_voidPointer, [
    size_t,
    js_voidPointer,
  ]],
  operator new[]: [js_voidPointer, [
    size_t,
    size_t,
  ]],
  operator new[]: [js_voidPointer, [
    size_t,
    size_t,
    js_voidPointer,
  ]],
});

module.exports = {
  constants,
  types,
  functions,
};

