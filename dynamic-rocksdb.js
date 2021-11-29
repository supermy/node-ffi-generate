/*
 * This file was automatically generated. It is better to run the generator again, than to manually edit.
 *
 * @ffi-packager/ffi-generate v2.0.2
 * - git commit v2.0.2-8-g883bd93-dirty on branch (no git branch)
 * - Homebrew clang version 12.0.0
 * https://github.com/node-ffi-packager/node-ffi-generate
 *
 * File:
 * - Name: "c.h"
 * - SHA256: 386f402b535939c7086a4b9212fe96fc75b626727420a7812f275298e5d9bdc9
 *
 * Generator options:
 * - Library: "librocksdb"
 * - Single file: false
 * - Prefixes: []
 * - Compiler arguments: ["-I/usr/local//Cellar/rocksdb/6.20.3/include/","-I/usr/local//Cellar/llvm/12.0.0_1/lib/clang/12.0.0/include/"]
 */

const FFI = require("ffi-napi");
const ref = require("ref-napi");
const ArrayType = require("ref-array-di")(ref);
const Struct = require("ref-struct-di")(ref);
const Union = require("ref-union-di")(ref);

const constants = {
  "rocksdb_block_based_table_data_block_index_type_binary_search": {
      rocksdb_block_based_table_data_block_index_type_binary_search: 0,
      rocksdb_block_based_table_data_block_index_type_binary_search_and_hash: 1,
      "0": "rocksdb_block_based_table_data_block_index_type_binary_search",
      "1": "rocksdb_block_based_table_data_block_index_type_binary_search_and_hash",
  },
  "rocksdb_block_based_table_index_type_binary_search": {
      rocksdb_block_based_table_index_type_binary_search: 0,
      rocksdb_block_based_table_index_type_hash_search: 1,
      rocksdb_block_based_table_index_type_two_level_index_search: 2,
      "0": "rocksdb_block_based_table_index_type_binary_search",
      "1": "rocksdb_block_based_table_index_type_hash_search",
      "2": "rocksdb_block_based_table_index_type_two_level_index_search",
  },
  "rocksdb_level_compaction": {
      rocksdb_level_compaction: 0,
      rocksdb_universal_compaction: 1,
      rocksdb_fifo_compaction: 2,
      "0": "rocksdb_level_compaction",
      "1": "rocksdb_universal_compaction",
      "2": "rocksdb_fifo_compaction",
  },
  "rocksdb_no_compression": {
      rocksdb_no_compression: 0,
      rocksdb_snappy_compression: 1,
      rocksdb_zlib_compression: 2,
      rocksdb_bz2_compression: 3,
      rocksdb_lz4_compression: 4,
      rocksdb_lz4hc_compression: 5,
      rocksdb_xpress_compression: 6,
      rocksdb_zstd_compression: 7,
      "0": "rocksdb_no_compression",
      "1": "rocksdb_snappy_compression",
      "2": "rocksdb_zlib_compression",
      "3": "rocksdb_bz2_compression",
      "4": "rocksdb_lz4_compression",
      "5": "rocksdb_lz4hc_compression",
      "6": "rocksdb_xpress_compression",
      "7": "rocksdb_zstd_compression",
  },
  "rocksdb_similar_size_compaction_stop_style": {
      rocksdb_similar_size_compaction_stop_style: 0,
      rocksdb_total_size_compaction_stop_style: 1,
      "0": "rocksdb_similar_size_compaction_stop_style",
      "1": "rocksdb_total_size_compaction_stop_style",
  },
  "rocksdb_tolerate_corrupted_tail_records_recovery": {
      rocksdb_tolerate_corrupted_tail_records_recovery: 0,
      rocksdb_absolute_consistency_recovery: 1,
      rocksdb_point_in_time_recovery: 2,
      rocksdb_skip_any_corrupted_records_recovery: 3,
      "0": "rocksdb_tolerate_corrupted_tail_records_recovery",
      "1": "rocksdb_absolute_consistency_recovery",
      "2": "rocksdb_point_in_time_recovery",
      "3": "rocksdb_skip_any_corrupted_records_recovery",
  },
  "rocksdb_uninitialized": {
      rocksdb_uninitialized: 0,
      rocksdb_disable: 1,
      rocksdb_enable_count: 2,
      rocksdb_enable_time_except_for_mutex: 3,
      rocksdb_enable_time: 4,
      rocksdb_out_of_bounds: 5,
      "0": "rocksdb_uninitialized",
      "1": "rocksdb_disable",
      "2": "rocksdb_enable_count",
      "3": "rocksdb_enable_time_except_for_mutex",
      "4": "rocksdb_enable_time",
      "5": "rocksdb_out_of_bounds",
  },
  "rocksdb_user_key_comparison_count": {
      rocksdb_user_key_comparison_count: 0,
      rocksdb_block_cache_hit_count: 1,
      rocksdb_block_read_count: 2,
      rocksdb_block_read_byte: 3,
      rocksdb_block_read_time: 4,
      rocksdb_block_checksum_time: 5,
      rocksdb_block_decompress_time: 6,
      rocksdb_get_read_bytes: 7,
      rocksdb_multiget_read_bytes: 8,
      rocksdb_iter_read_bytes: 9,
      rocksdb_internal_key_skipped_count: 10,
      rocksdb_internal_delete_skipped_count: 11,
      rocksdb_internal_recent_skipped_count: 12,
      rocksdb_internal_merge_count: 13,
      rocksdb_get_snapshot_time: 14,
      rocksdb_get_from_memtable_time: 15,
      rocksdb_get_from_memtable_count: 16,
      rocksdb_get_post_process_time: 17,
      rocksdb_get_from_output_files_time: 18,
      rocksdb_seek_on_memtable_time: 19,
      rocksdb_seek_on_memtable_count: 20,
      rocksdb_next_on_memtable_count: 21,
      rocksdb_prev_on_memtable_count: 22,
      rocksdb_seek_child_seek_time: 23,
      rocksdb_seek_child_seek_count: 24,
      rocksdb_seek_min_heap_time: 25,
      rocksdb_seek_max_heap_time: 26,
      rocksdb_seek_internal_seek_time: 27,
      rocksdb_find_next_user_entry_time: 28,
      rocksdb_write_wal_time: 29,
      rocksdb_write_memtable_time: 30,
      rocksdb_write_delay_time: 31,
      rocksdb_write_pre_and_post_process_time: 32,
      rocksdb_db_mutex_lock_nanos: 33,
      rocksdb_db_condition_wait_nanos: 34,
      rocksdb_merge_operator_time_nanos: 35,
      rocksdb_read_index_block_nanos: 36,
      rocksdb_read_filter_block_nanos: 37,
      rocksdb_new_table_block_iter_nanos: 38,
      rocksdb_new_table_iterator_nanos: 39,
      rocksdb_block_seek_nanos: 40,
      rocksdb_find_table_nanos: 41,
      rocksdb_bloom_memtable_hit_count: 42,
      rocksdb_bloom_memtable_miss_count: 43,
      rocksdb_bloom_sst_hit_count: 44,
      rocksdb_bloom_sst_miss_count: 45,
      rocksdb_key_lock_wait_time: 46,
      rocksdb_key_lock_wait_count: 47,
      rocksdb_env_new_sequential_file_nanos: 48,
      rocksdb_env_new_random_access_file_nanos: 49,
      rocksdb_env_new_writable_file_nanos: 50,
      rocksdb_env_reuse_writable_file_nanos: 51,
      rocksdb_env_new_random_rw_file_nanos: 52,
      rocksdb_env_new_directory_nanos: 53,
      rocksdb_env_file_exists_nanos: 54,
      rocksdb_env_get_children_nanos: 55,
      rocksdb_env_get_children_file_attributes_nanos: 56,
      rocksdb_env_delete_file_nanos: 57,
      rocksdb_env_create_dir_nanos: 58,
      rocksdb_env_create_dir_if_missing_nanos: 59,
      rocksdb_env_delete_dir_nanos: 60,
      rocksdb_env_get_file_size_nanos: 61,
      rocksdb_env_get_file_modification_time_nanos: 62,
      rocksdb_env_rename_file_nanos: 63,
      rocksdb_env_link_file_nanos: 64,
      rocksdb_env_lock_file_nanos: 65,
      rocksdb_env_unlock_file_nanos: 66,
      rocksdb_env_new_logger_nanos: 67,
      rocksdb_total_metric_count: 68,
      "0": "rocksdb_user_key_comparison_count",
      "1": "rocksdb_block_cache_hit_count",
      "2": "rocksdb_block_read_count",
      "3": "rocksdb_block_read_byte",
      "4": "rocksdb_block_read_time",
      "5": "rocksdb_block_checksum_time",
      "6": "rocksdb_block_decompress_time",
      "7": "rocksdb_get_read_bytes",
      "8": "rocksdb_multiget_read_bytes",
      "9": "rocksdb_iter_read_bytes",
      "10": "rocksdb_internal_key_skipped_count",
      "11": "rocksdb_internal_delete_skipped_count",
      "12": "rocksdb_internal_recent_skipped_count",
      "13": "rocksdb_internal_merge_count",
      "14": "rocksdb_get_snapshot_time",
      "15": "rocksdb_get_from_memtable_time",
      "16": "rocksdb_get_from_memtable_count",
      "17": "rocksdb_get_post_process_time",
      "18": "rocksdb_get_from_output_files_time",
      "19": "rocksdb_seek_on_memtable_time",
      "20": "rocksdb_seek_on_memtable_count",
      "21": "rocksdb_next_on_memtable_count",
      "22": "rocksdb_prev_on_memtable_count",
      "23": "rocksdb_seek_child_seek_time",
      "24": "rocksdb_seek_child_seek_count",
      "25": "rocksdb_seek_min_heap_time",
      "26": "rocksdb_seek_max_heap_time",
      "27": "rocksdb_seek_internal_seek_time",
      "28": "rocksdb_find_next_user_entry_time",
      "29": "rocksdb_write_wal_time",
      "30": "rocksdb_write_memtable_time",
      "31": "rocksdb_write_delay_time",
      "32": "rocksdb_write_pre_and_post_process_time",
      "33": "rocksdb_db_mutex_lock_nanos",
      "34": "rocksdb_db_condition_wait_nanos",
      "35": "rocksdb_merge_operator_time_nanos",
      "36": "rocksdb_read_index_block_nanos",
      "37": "rocksdb_read_filter_block_nanos",
      "38": "rocksdb_new_table_block_iter_nanos",
      "39": "rocksdb_new_table_iterator_nanos",
      "40": "rocksdb_block_seek_nanos",
      "41": "rocksdb_find_table_nanos",
      "42": "rocksdb_bloom_memtable_hit_count",
      "43": "rocksdb_bloom_memtable_miss_count",
      "44": "rocksdb_bloom_sst_hit_count",
      "45": "rocksdb_bloom_sst_miss_count",
      "46": "rocksdb_key_lock_wait_time",
      "47": "rocksdb_key_lock_wait_count",
      "48": "rocksdb_env_new_sequential_file_nanos",
      "49": "rocksdb_env_new_random_access_file_nanos",
      "50": "rocksdb_env_new_writable_file_nanos",
      "51": "rocksdb_env_reuse_writable_file_nanos",
      "52": "rocksdb_env_new_random_rw_file_nanos",
      "53": "rocksdb_env_new_directory_nanos",
      "54": "rocksdb_env_file_exists_nanos",
      "55": "rocksdb_env_get_children_nanos",
      "56": "rocksdb_env_get_children_file_attributes_nanos",
      "57": "rocksdb_env_delete_file_nanos",
      "58": "rocksdb_env_create_dir_nanos",
      "59": "rocksdb_env_create_dir_if_missing_nanos",
      "60": "rocksdb_env_delete_dir_nanos",
      "61": "rocksdb_env_get_file_size_nanos",
      "62": "rocksdb_env_get_file_modification_time_nanos",
      "63": "rocksdb_env_rename_file_nanos",
      "64": "rocksdb_env_link_file_nanos",
      "65": "rocksdb_env_lock_file_nanos",
      "66": "rocksdb_env_unlock_file_nanos",
      "67": "rocksdb_env_new_logger_nanos",
      "68": "rocksdb_total_metric_count",
  },
};

// NOTE: defining individual types as "global" constants to be able to reference them without any prefix.
const types = {};

const js_void = ref.types.void;
const js_voidPointer = ref.refType(js_void);
const rocksdb_t = js_voidPointer;
const rocksdb_tPointer = ref.refType(rocksdb_t);
const rocksdb_options_t = js_voidPointer;
const rocksdb_options_tPointer = ref.refType(rocksdb_options_t);
const js_CString = ref.types.CString;
const js_int32 = ref.types.int32;
const js_uchar = ref.types.uchar;
const rocksdb_backup_engine_t = js_voidPointer;
const rocksdb_backup_engine_tPointer = ref.refType(rocksdb_backup_engine_t);
const rocksdb_backupable_db_options_t = js_voidPointer;
const rocksdb_backupable_db_options_tPointer = ref.refType(rocksdb_backupable_db_options_t);
const rocksdb_env_t = js_voidPointer;
const rocksdb_env_tPointer = ref.refType(rocksdb_env_t);
const js_uint32 = ref.types.uint32;
const uint32_t = js_uint32;
const rocksdb_restore_options_t = js_voidPointer;
const rocksdb_restore_options_tPointer = ref.refType(rocksdb_restore_options_t);
const rocksdb_backup_engine_info_t = js_voidPointer;
const rocksdb_backup_engine_info_tPointer = ref.refType(rocksdb_backup_engine_info_t);
const js_longlong = ref.types.longlong;
const int64_t = js_longlong;
const js_ulonglong = ref.types.ulonglong;
const uint64_t = js_ulonglong;
const rocksdb_checkpoint_t = js_voidPointer;
const rocksdb_checkpoint_tPointer = ref.refType(rocksdb_checkpoint_t);
const rocksdb_column_family_handle_t = js_voidPointer;
const rocksdb_column_family_handle_tPointer = ref.refType(rocksdb_column_family_handle_t);
const js_int32Pointer = ref.refType(js_int32);
const js_ulong = ref.types.ulong;
const size_t = js_ulong;
const size_tPointer = ref.refType(size_t);
const rocksdb_writeoptions_t = js_voidPointer;
const rocksdb_writeoptions_tPointer = ref.refType(rocksdb_writeoptions_t);
const rocksdb_writebatch_t = js_voidPointer;
const rocksdb_writebatch_tPointer = ref.refType(rocksdb_writebatch_t);
const rocksdb_readoptions_t = js_voidPointer;
const rocksdb_readoptions_tPointer = ref.refType(rocksdb_readoptions_t);
const js_ucharPointer = ref.refType(js_uchar);
const rocksdb_iterator_t = js_voidPointer;
const rocksdb_iterator_tPointer = ref.refType(rocksdb_iterator_t);
const rocksdb_wal_iterator_t = js_voidPointer;
const rocksdb_wal_iterator_tPointer = ref.refType(rocksdb_wal_iterator_t);
const rocksdb_wal_readoptions_t = js_voidPointer;
const rocksdb_wal_readoptions_tPointer = ref.refType(rocksdb_wal_readoptions_t);
const rocksdb_snapshot_t = js_voidPointer;
const rocksdb_snapshot_tPointer = ref.refType(rocksdb_snapshot_t);
const uint64_tPointer = ref.refType(uint64_t);
const rocksdb_compactoptions_t = js_voidPointer;
const rocksdb_compactoptions_tPointer = ref.refType(rocksdb_compactoptions_t);
const rocksdb_livefiles_t = js_voidPointer;
const rocksdb_livefiles_tPointer = ref.refType(rocksdb_livefiles_t);
const rocksdb_flushoptions_t = js_voidPointer;
const rocksdb_flushoptions_tPointer = ref.refType(rocksdb_flushoptions_t);
const FunctionProto_0 = FFI.Function(ref.types.void, [
  js_voidPointer,
  js_CString,
  size_t,
  js_CString,
  size_t,
])
;
const FunctionProto_1 = FFI.Function(ref.types.void, [
  js_voidPointer,
  js_CString,
  size_t,
])
;
const rocksdb_writebatch_wi_t = js_voidPointer;
const rocksdb_writebatch_wi_tPointer = ref.refType(rocksdb_writebatch_wi_t);
const FunctionProto_2 = FFI.Function(ref.types.void, [
  js_voidPointer,
  js_CString,
  size_t,
  js_CString,
  size_t,
])
;
const FunctionProto_3 = FFI.Function(ref.types.void, [
  js_voidPointer,
  js_CString,
  size_t,
])
;
const rocksdb_block_based_table_options_t = js_voidPointer;
const rocksdb_block_based_table_options_tPointer = ref.refType(rocksdb_block_based_table_options_t);
const rocksdb_filterpolicy_t = js_voidPointer;
const rocksdb_filterpolicy_tPointer = ref.refType(rocksdb_filterpolicy_t);
const rocksdb_cache_t = js_voidPointer;
const rocksdb_cache_tPointer = ref.refType(rocksdb_cache_t);
const js_double = ref.types.double;
const rocksdb_cuckoo_table_options_t = js_voidPointer;
const rocksdb_cuckoo_table_options_tPointer = ref.refType(rocksdb_cuckoo_table_options_t);
const rocksdb_compactionfilter_t = js_voidPointer;
const rocksdb_compactionfilter_tPointer = ref.refType(rocksdb_compactionfilter_t);
const rocksdb_compactionfilterfactory_t = js_voidPointer;
const rocksdb_compactionfilterfactory_tPointer = ref.refType(rocksdb_compactionfilterfactory_t);
const rocksdb_comparator_t = js_voidPointer;
const rocksdb_comparator_tPointer = ref.refType(rocksdb_comparator_t);
const rocksdb_mergeoperator_t = js_voidPointer;
const rocksdb_mergeoperator_tPointer = ref.refType(rocksdb_mergeoperator_t);
const rocksdb_dbpath_t = js_voidPointer;
const rocksdb_dbpath_tPointer = ref.refType(rocksdb_dbpath_t);
const rocksdb_logger_t = js_voidPointer;
const rocksdb_logger_tPointer = ref.refType(rocksdb_logger_t);
const rocksdb_slicetransform_t = js_voidPointer;
const rocksdb_slicetransform_tPointer = ref.refType(rocksdb_slicetransform_t);
const int32_t = js_int32;
const rocksdb_universal_compaction_options_t = js_voidPointer;
const rocksdb_universal_compaction_options_tPointer = ref.refType(rocksdb_universal_compaction_options_t);
const rocksdb_fifo_compaction_options_t = js_voidPointer;
const rocksdb_fifo_compaction_options_tPointer = ref.refType(rocksdb_fifo_compaction_options_t);
const rocksdb_ratelimiter_t = js_voidPointer;
const rocksdb_ratelimiter_tPointer = ref.refType(rocksdb_ratelimiter_t);
const rocksdb_perfcontext_t = js_voidPointer;
const rocksdb_perfcontext_tPointer = ref.refType(rocksdb_perfcontext_t);
const FunctionProto_4 = FFI.Function(ref.types.void, [
  js_voidPointer,
])
;
const FunctionProto_5 = FFI.Function(ref.types.uchar, [
  js_voidPointer,
  js_int32,
  js_CString,
  size_t,
  js_CString,
  size_t,
  js_CString,
  size_tPointer,
  js_ucharPointer,
])
;
const FunctionProto_6 = FFI.Function(ref.types.CString, [
  js_voidPointer,
])
;
const rocksdb_compactionfiltercontext_t = js_voidPointer;
const rocksdb_compactionfiltercontext_tPointer = ref.refType(rocksdb_compactionfiltercontext_t);
const FunctionProto_7 = FFI.Function(ref.types.void, [
  js_voidPointer,
])
;
const FunctionProto_8 = FFI.Function(ref.refType(rocksdb_compactionfilter_t), [
  js_voidPointer,
  rocksdb_compactionfiltercontext_tPointer,
])
;
const FunctionProto_9 = FFI.Function(ref.types.CString, [
  js_voidPointer,
])
;
const FunctionProto_10 = FFI.Function(ref.types.void, [
  js_voidPointer,
])
;
const FunctionProto_11 = FFI.Function(ref.types.int32, [
  js_voidPointer,
  js_CString,
  size_t,
  js_CString,
  size_t,
])
;
const FunctionProto_12 = FFI.Function(ref.types.CString, [
  js_voidPointer,
])
;
const FunctionProto_13 = FFI.Function(ref.types.void, [
  js_voidPointer,
])
;
const FunctionProto_14 = FFI.Function(ref.types.CString, [
  js_voidPointer,
  js_CString,
  size_tPointer,
  js_int32,
  size_tPointer,
])
;
const FunctionProto_15 = FFI.Function(ref.types.uchar, [
  js_voidPointer,
  js_CString,
  size_t,
  js_CString,
  size_t,
])
;
const FunctionProto_16 = FFI.Function(ref.types.void, [
  js_voidPointer,
  js_CString,
  size_t,
])
;
const FunctionProto_17 = FFI.Function(ref.types.CString, [
  js_voidPointer,
])
;
const FunctionProto_18 = FFI.Function(ref.types.void, [
  js_voidPointer,
])
;
const FunctionProto_19 = FFI.Function(ref.types.CString, [
  js_voidPointer,
  js_CString,
  size_t,
  js_CString,
  size_t,
  js_CString,
  size_tPointer,
  js_int32,
  js_ucharPointer,
  size_tPointer,
])
;
const FunctionProto_20 = FFI.Function(ref.types.CString, [
  js_voidPointer,
  js_CString,
  size_t,
  js_CString,
  size_tPointer,
  js_int32,
  js_ucharPointer,
  size_tPointer,
])
;
const FunctionProto_21 = FFI.Function(ref.types.void, [
  js_voidPointer,
  js_CString,
  size_t,
])
;
const FunctionProto_22 = FFI.Function(ref.types.CString, [
  js_voidPointer,
])
;
const rocksdb_envoptions_t = js_voidPointer;
const rocksdb_envoptions_tPointer = ref.refType(rocksdb_envoptions_t);
const rocksdb_sstfilewriter_t = js_voidPointer;
const rocksdb_sstfilewriter_tPointer = ref.refType(rocksdb_sstfilewriter_t);
const rocksdb_ingestexternalfileoptions_t = js_voidPointer;
const rocksdb_ingestexternalfileoptions_tPointer = ref.refType(rocksdb_ingestexternalfileoptions_t);
const FunctionProto_23 = FFI.Function(ref.types.void, [
  js_voidPointer,
])
;
const FunctionProto_24 = FFI.Function(ref.types.CString, [
  js_voidPointer,
  js_CString,
  size_t,
  size_tPointer,
])
;
const FunctionProto_25 = FFI.Function(ref.types.uchar, [
  js_voidPointer,
  js_CString,
  size_t,
])
;
const FunctionProto_26 = FFI.Function(ref.types.uchar, [
  js_voidPointer,
  js_CString,
  size_t,
])
;
const FunctionProto_27 = FFI.Function(ref.types.CString, [
  js_voidPointer,
])
;
const rocksdb_transactiondb_t = js_voidPointer;
const rocksdb_transactiondb_tPointer = ref.refType(rocksdb_transactiondb_t);
const rocksdb_transactiondb_options_t = js_voidPointer;
const rocksdb_transactiondb_options_tPointer = ref.refType(rocksdb_transactiondb_options_t);
const rocksdb_transaction_t = js_voidPointer;
const rocksdb_transaction_tPointer = ref.refType(rocksdb_transaction_t);
const rocksdb_transaction_options_t = js_voidPointer;
const rocksdb_transaction_options_tPointer = ref.refType(rocksdb_transaction_options_t);
const rocksdb_optimistictransactiondb_t = js_voidPointer;
const rocksdb_optimistictransactiondb_tPointer = ref.refType(rocksdb_optimistictransactiondb_t);
const rocksdb_optimistictransaction_options_t = js_voidPointer;
const rocksdb_optimistictransaction_options_tPointer = ref.refType(rocksdb_optimistictransaction_options_t);
const rocksdb_pinnableslice_t = js_voidPointer;
const rocksdb_pinnableslice_tPointer = ref.refType(rocksdb_pinnableslice_t);
const rocksdb_memory_consumers_t = js_voidPointer;
const rocksdb_memory_consumers_tPointer = ref.refType(rocksdb_memory_consumers_t);
const rocksdb_memory_usage_t = js_voidPointer;
const rocksdb_memory_usage_tPointer = ref.refType(rocksdb_memory_usage_t);

types["FunctionProto_0"] = FunctionProto_0;
types["FunctionProto_1"] = FunctionProto_1;
types["FunctionProto_10"] = FunctionProto_10;
types["FunctionProto_11"] = FunctionProto_11;
types["FunctionProto_12"] = FunctionProto_12;
types["FunctionProto_13"] = FunctionProto_13;
types["FunctionProto_14"] = FunctionProto_14;
types["FunctionProto_15"] = FunctionProto_15;
types["FunctionProto_16"] = FunctionProto_16;
types["FunctionProto_17"] = FunctionProto_17;
types["FunctionProto_18"] = FunctionProto_18;
types["FunctionProto_19"] = FunctionProto_19;
types["FunctionProto_2"] = FunctionProto_2;
types["FunctionProto_20"] = FunctionProto_20;
types["FunctionProto_21"] = FunctionProto_21;
types["FunctionProto_22"] = FunctionProto_22;
types["FunctionProto_23"] = FunctionProto_23;
types["FunctionProto_24"] = FunctionProto_24;
types["FunctionProto_25"] = FunctionProto_25;
types["FunctionProto_26"] = FunctionProto_26;
types["FunctionProto_27"] = FunctionProto_27;
types["FunctionProto_3"] = FunctionProto_3;
types["FunctionProto_4"] = FunctionProto_4;
types["FunctionProto_5"] = FunctionProto_5;
types["FunctionProto_6"] = FunctionProto_6;
types["FunctionProto_7"] = FunctionProto_7;
types["FunctionProto_8"] = FunctionProto_8;
types["FunctionProto_9"] = FunctionProto_9;
types["int32_t"] = int32_t;
types["int64_t"] = int64_t;
types["js_CString"] = js_CString;
types["js_double"] = js_double;
types["js_int32"] = js_int32;
types["js_int32Pointer"] = js_int32Pointer;
types["js_longlong"] = js_longlong;
types["js_uchar"] = js_uchar;
types["js_ucharPointer"] = js_ucharPointer;
types["js_uint32"] = js_uint32;
types["js_ulong"] = js_ulong;
types["js_ulonglong"] = js_ulonglong;
types["js_void"] = js_void;
types["js_voidPointer"] = js_voidPointer;
types["rocksdb_backup_engine_info_t"] = rocksdb_backup_engine_info_t;
types["rocksdb_backup_engine_info_tPointer"] = rocksdb_backup_engine_info_tPointer;
types["rocksdb_backup_engine_t"] = rocksdb_backup_engine_t;
types["rocksdb_backup_engine_tPointer"] = rocksdb_backup_engine_tPointer;
types["rocksdb_backupable_db_options_t"] = rocksdb_backupable_db_options_t;
types["rocksdb_backupable_db_options_tPointer"] = rocksdb_backupable_db_options_tPointer;
types["rocksdb_block_based_table_options_t"] = rocksdb_block_based_table_options_t;
types["rocksdb_block_based_table_options_tPointer"] = rocksdb_block_based_table_options_tPointer;
types["rocksdb_cache_t"] = rocksdb_cache_t;
types["rocksdb_cache_tPointer"] = rocksdb_cache_tPointer;
types["rocksdb_checkpoint_t"] = rocksdb_checkpoint_t;
types["rocksdb_checkpoint_tPointer"] = rocksdb_checkpoint_tPointer;
types["rocksdb_column_family_handle_t"] = rocksdb_column_family_handle_t;
types["rocksdb_column_family_handle_tPointer"] = rocksdb_column_family_handle_tPointer;
types["rocksdb_compactionfilter_t"] = rocksdb_compactionfilter_t;
types["rocksdb_compactionfilter_tPointer"] = rocksdb_compactionfilter_tPointer;
types["rocksdb_compactionfiltercontext_t"] = rocksdb_compactionfiltercontext_t;
types["rocksdb_compactionfiltercontext_tPointer"] = rocksdb_compactionfiltercontext_tPointer;
types["rocksdb_compactionfilterfactory_t"] = rocksdb_compactionfilterfactory_t;
types["rocksdb_compactionfilterfactory_tPointer"] = rocksdb_compactionfilterfactory_tPointer;
types["rocksdb_compactoptions_t"] = rocksdb_compactoptions_t;
types["rocksdb_compactoptions_tPointer"] = rocksdb_compactoptions_tPointer;
types["rocksdb_comparator_t"] = rocksdb_comparator_t;
types["rocksdb_comparator_tPointer"] = rocksdb_comparator_tPointer;
types["rocksdb_cuckoo_table_options_t"] = rocksdb_cuckoo_table_options_t;
types["rocksdb_cuckoo_table_options_tPointer"] = rocksdb_cuckoo_table_options_tPointer;
types["rocksdb_dbpath_t"] = rocksdb_dbpath_t;
types["rocksdb_dbpath_tPointer"] = rocksdb_dbpath_tPointer;
types["rocksdb_env_t"] = rocksdb_env_t;
types["rocksdb_env_tPointer"] = rocksdb_env_tPointer;
types["rocksdb_envoptions_t"] = rocksdb_envoptions_t;
types["rocksdb_envoptions_tPointer"] = rocksdb_envoptions_tPointer;
types["rocksdb_fifo_compaction_options_t"] = rocksdb_fifo_compaction_options_t;
types["rocksdb_fifo_compaction_options_tPointer"] = rocksdb_fifo_compaction_options_tPointer;
types["rocksdb_filterpolicy_t"] = rocksdb_filterpolicy_t;
types["rocksdb_filterpolicy_tPointer"] = rocksdb_filterpolicy_tPointer;
types["rocksdb_flushoptions_t"] = rocksdb_flushoptions_t;
types["rocksdb_flushoptions_tPointer"] = rocksdb_flushoptions_tPointer;
types["rocksdb_ingestexternalfileoptions_t"] = rocksdb_ingestexternalfileoptions_t;
types["rocksdb_ingestexternalfileoptions_tPointer"] = rocksdb_ingestexternalfileoptions_tPointer;
types["rocksdb_iterator_t"] = rocksdb_iterator_t;
types["rocksdb_iterator_tPointer"] = rocksdb_iterator_tPointer;
types["rocksdb_livefiles_t"] = rocksdb_livefiles_t;
types["rocksdb_livefiles_tPointer"] = rocksdb_livefiles_tPointer;
types["rocksdb_logger_t"] = rocksdb_logger_t;
types["rocksdb_logger_tPointer"] = rocksdb_logger_tPointer;
types["rocksdb_memory_consumers_t"] = rocksdb_memory_consumers_t;
types["rocksdb_memory_consumers_tPointer"] = rocksdb_memory_consumers_tPointer;
types["rocksdb_memory_usage_t"] = rocksdb_memory_usage_t;
types["rocksdb_memory_usage_tPointer"] = rocksdb_memory_usage_tPointer;
types["rocksdb_mergeoperator_t"] = rocksdb_mergeoperator_t;
types["rocksdb_mergeoperator_tPointer"] = rocksdb_mergeoperator_tPointer;
types["rocksdb_optimistictransaction_options_t"] = rocksdb_optimistictransaction_options_t;
types["rocksdb_optimistictransaction_options_tPointer"] = rocksdb_optimistictransaction_options_tPointer;
types["rocksdb_optimistictransactiondb_t"] = rocksdb_optimistictransactiondb_t;
types["rocksdb_optimistictransactiondb_tPointer"] = rocksdb_optimistictransactiondb_tPointer;
types["rocksdb_options_t"] = rocksdb_options_t;
types["rocksdb_options_tPointer"] = rocksdb_options_tPointer;
types["rocksdb_perfcontext_t"] = rocksdb_perfcontext_t;
types["rocksdb_perfcontext_tPointer"] = rocksdb_perfcontext_tPointer;
types["rocksdb_pinnableslice_t"] = rocksdb_pinnableslice_t;
types["rocksdb_pinnableslice_tPointer"] = rocksdb_pinnableslice_tPointer;
types["rocksdb_ratelimiter_t"] = rocksdb_ratelimiter_t;
types["rocksdb_ratelimiter_tPointer"] = rocksdb_ratelimiter_tPointer;
types["rocksdb_readoptions_t"] = rocksdb_readoptions_t;
types["rocksdb_readoptions_tPointer"] = rocksdb_readoptions_tPointer;
types["rocksdb_restore_options_t"] = rocksdb_restore_options_t;
types["rocksdb_restore_options_tPointer"] = rocksdb_restore_options_tPointer;
types["rocksdb_slicetransform_t"] = rocksdb_slicetransform_t;
types["rocksdb_slicetransform_tPointer"] = rocksdb_slicetransform_tPointer;
types["rocksdb_snapshot_t"] = rocksdb_snapshot_t;
types["rocksdb_snapshot_tPointer"] = rocksdb_snapshot_tPointer;
types["rocksdb_sstfilewriter_t"] = rocksdb_sstfilewriter_t;
types["rocksdb_sstfilewriter_tPointer"] = rocksdb_sstfilewriter_tPointer;
types["rocksdb_t"] = rocksdb_t;
types["rocksdb_tPointer"] = rocksdb_tPointer;
types["rocksdb_transaction_options_t"] = rocksdb_transaction_options_t;
types["rocksdb_transaction_options_tPointer"] = rocksdb_transaction_options_tPointer;
types["rocksdb_transaction_t"] = rocksdb_transaction_t;
types["rocksdb_transaction_tPointer"] = rocksdb_transaction_tPointer;
types["rocksdb_transactiondb_options_t"] = rocksdb_transactiondb_options_t;
types["rocksdb_transactiondb_options_tPointer"] = rocksdb_transactiondb_options_tPointer;
types["rocksdb_transactiondb_t"] = rocksdb_transactiondb_t;
types["rocksdb_transactiondb_tPointer"] = rocksdb_transactiondb_tPointer;
types["rocksdb_universal_compaction_options_t"] = rocksdb_universal_compaction_options_t;
types["rocksdb_universal_compaction_options_tPointer"] = rocksdb_universal_compaction_options_tPointer;
types["rocksdb_wal_iterator_t"] = rocksdb_wal_iterator_t;
types["rocksdb_wal_iterator_tPointer"] = rocksdb_wal_iterator_tPointer;
types["rocksdb_wal_readoptions_t"] = rocksdb_wal_readoptions_t;
types["rocksdb_wal_readoptions_tPointer"] = rocksdb_wal_readoptions_tPointer;
types["rocksdb_writebatch_t"] = rocksdb_writebatch_t;
types["rocksdb_writebatch_tPointer"] = rocksdb_writebatch_tPointer;
types["rocksdb_writebatch_wi_t"] = rocksdb_writebatch_wi_t;
types["rocksdb_writebatch_wi_tPointer"] = rocksdb_writebatch_wi_tPointer;
types["rocksdb_writeoptions_t"] = rocksdb_writeoptions_t;
types["rocksdb_writeoptions_tPointer"] = rocksdb_writeoptions_tPointer;
types["size_t"] = size_t;
types["size_tPointer"] = size_tPointer;
types["uint32_t"] = uint32_t;
types["uint64_t"] = uint64_t;
types["uint64_tPointer"] = uint64_tPointer;

const functions = new FFI.Library("librocksdb", {
  rocksdb_approximate_memory_usage_create: [rocksdb_memory_usage_tPointer, [
    rocksdb_memory_consumers_tPointer,
    js_CString,
  ]],
  rocksdb_approximate_memory_usage_destroy: [js_void, [
    rocksdb_memory_usage_tPointer,
  ]],
  rocksdb_approximate_memory_usage_get_cache_total: [uint64_t, [
    rocksdb_memory_usage_tPointer,
  ]],
  rocksdb_approximate_memory_usage_get_mem_table_readers_total: [uint64_t, [
    rocksdb_memory_usage_tPointer,
  ]],
  rocksdb_approximate_memory_usage_get_mem_table_total: [uint64_t, [
    rocksdb_memory_usage_tPointer,
  ]],
  rocksdb_approximate_memory_usage_get_mem_table_unflushed: [uint64_t, [
    rocksdb_memory_usage_tPointer,
  ]],
  rocksdb_approximate_sizes: [js_void, [
    rocksdb_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_CString,
    size_tPointer,
    uint64_tPointer,
    js_CString,
  ]],
  rocksdb_approximate_sizes_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_CString,
    size_tPointer,
    uint64_tPointer,
    js_CString,
  ]],
  rocksdb_backup_engine_close: [js_void, [
    rocksdb_backup_engine_tPointer,
  ]],
  rocksdb_backup_engine_create_new_backup: [js_void, [
    rocksdb_backup_engine_tPointer,
    rocksdb_tPointer,
    js_CString,
  ]],
  rocksdb_backup_engine_create_new_backup_flush: [js_void, [
    rocksdb_backup_engine_tPointer,
    rocksdb_tPointer,
    js_uchar,
    js_CString,
  ]],
  rocksdb_backup_engine_get_backup_info: [rocksdb_backup_engine_info_tPointer, [
    rocksdb_backup_engine_tPointer,
  ]],
  rocksdb_backup_engine_info_backup_id: [uint32_t, [
    rocksdb_backup_engine_info_tPointer,
    js_int32,
  ]],
  rocksdb_backup_engine_info_count: [js_int32, [
    rocksdb_backup_engine_info_tPointer,
  ]],
  rocksdb_backup_engine_info_destroy: [js_void, [
    rocksdb_backup_engine_info_tPointer,
  ]],
  rocksdb_backup_engine_info_number_files: [uint32_t, [
    rocksdb_backup_engine_info_tPointer,
    js_int32,
  ]],
  rocksdb_backup_engine_info_size: [uint64_t, [
    rocksdb_backup_engine_info_tPointer,
    js_int32,
  ]],
  rocksdb_backup_engine_info_timestamp: [int64_t, [
    rocksdb_backup_engine_info_tPointer,
    js_int32,
  ]],
  rocksdb_backup_engine_open: [rocksdb_backup_engine_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_CString,
  ]],
  rocksdb_backup_engine_open_opts: [rocksdb_backup_engine_tPointer, [
    rocksdb_backupable_db_options_tPointer,
    rocksdb_env_tPointer,
    js_CString,
  ]],
  rocksdb_backup_engine_purge_old_backups: [js_void, [
    rocksdb_backup_engine_tPointer,
    uint32_t,
    js_CString,
  ]],
  rocksdb_backup_engine_restore_db_from_backup: [js_void, [
    rocksdb_backup_engine_tPointer,
    js_CString,
    js_CString,
    rocksdb_restore_options_tPointer,
    uint32_t,
    js_CString,
  ]],
  rocksdb_backup_engine_restore_db_from_latest_backup: [js_void, [
    rocksdb_backup_engine_tPointer,
    js_CString,
    js_CString,
    rocksdb_restore_options_tPointer,
    js_CString,
  ]],
  rocksdb_backup_engine_verify_backup: [js_void, [
    rocksdb_backup_engine_tPointer,
    uint32_t,
    js_CString,
  ]],
  rocksdb_backupable_db_options_create: [rocksdb_backupable_db_options_tPointer, [
    js_CString,
  ]],
  rocksdb_backupable_db_options_destroy: [js_void, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_backup_log_files: [js_uchar, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_backup_rate_limit: [uint64_t, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_callback_trigger_interval_size: [uint64_t, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_destroy_old_data: [js_uchar, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_max_background_operations: [js_int32, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_max_valid_backups_to_open: [js_int32, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_restore_rate_limit: [uint64_t, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_share_files_with_checksum_naming: [js_int32, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_share_table_files: [js_uchar, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_get_sync: [js_uchar, [
    rocksdb_backupable_db_options_tPointer,
  ]],
  rocksdb_backupable_db_options_set_backup_dir: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    js_CString,
  ]],
  rocksdb_backupable_db_options_set_backup_log_files: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    js_uchar,
  ]],
  rocksdb_backupable_db_options_set_backup_rate_limit: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    uint64_t,
  ]],
  rocksdb_backupable_db_options_set_callback_trigger_interval_size: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    uint64_t,
  ]],
  rocksdb_backupable_db_options_set_destroy_old_data: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    js_uchar,
  ]],
  rocksdb_backupable_db_options_set_env: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    rocksdb_env_tPointer,
  ]],
  rocksdb_backupable_db_options_set_max_background_operations: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    js_int32,
  ]],
  rocksdb_backupable_db_options_set_max_valid_backups_to_open: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    js_int32,
  ]],
  rocksdb_backupable_db_options_set_restore_rate_limit: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    uint64_t,
  ]],
  rocksdb_backupable_db_options_set_share_files_with_checksum_naming: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    js_int32,
  ]],
  rocksdb_backupable_db_options_set_share_table_files: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    js_uchar,
  ]],
  rocksdb_backupable_db_options_set_sync: [js_void, [
    rocksdb_backupable_db_options_tPointer,
    js_uchar,
  ]],
  rocksdb_block_based_options_create: [rocksdb_block_based_table_options_tPointer, [
  ]],
  rocksdb_block_based_options_destroy: [js_void, [
    rocksdb_block_based_table_options_tPointer,
  ]],
  rocksdb_block_based_options_set_block_cache: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    rocksdb_cache_tPointer,
  ]],
  rocksdb_block_based_options_set_block_cache_compressed: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    rocksdb_cache_tPointer,
  ]],
  rocksdb_block_based_options_set_block_restart_interval: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_int32,
  ]],
  rocksdb_block_based_options_set_block_size: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    size_t,
  ]],
  rocksdb_block_based_options_set_block_size_deviation: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_int32,
  ]],
  rocksdb_block_based_options_set_cache_index_and_filter_blocks: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_block_based_options_set_cache_index_and_filter_blocks_with_high_priority: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_block_based_options_set_data_block_hash_ratio: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_double,
  ]],
  rocksdb_block_based_options_set_data_block_index_type: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_int32,
  ]],
  rocksdb_block_based_options_set_filter_policy: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    rocksdb_filterpolicy_tPointer,
  ]],
  rocksdb_block_based_options_set_format_version: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_int32,
  ]],
  rocksdb_block_based_options_set_hash_index_allow_collision: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_block_based_options_set_index_block_restart_interval: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_int32,
  ]],
  rocksdb_block_based_options_set_index_type: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_int32,
  ]],
  rocksdb_block_based_options_set_metadata_block_size: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    uint64_t,
  ]],
  rocksdb_block_based_options_set_no_block_cache: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_block_based_options_set_partition_filters: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_block_based_options_set_pin_l0_filter_and_index_blocks_in_cache: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_block_based_options_set_pin_top_level_index_and_filter: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_block_based_options_set_use_delta_encoding: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_block_based_options_set_whole_key_filtering: [js_void, [
    rocksdb_block_based_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_cache_create_lru: [rocksdb_cache_tPointer, [
    size_t,
  ]],
  rocksdb_cache_destroy: [js_void, [
    rocksdb_cache_tPointer,
  ]],
  rocksdb_cache_disown_data: [js_void, [
    rocksdb_cache_tPointer,
  ]],
  rocksdb_cache_get_capacity: [size_t, [
    rocksdb_cache_tPointer,
  ]],
  rocksdb_cache_get_pinned_usage: [size_t, [
    rocksdb_cache_tPointer,
  ]],
  rocksdb_cache_get_usage: [size_t, [
    rocksdb_cache_tPointer,
  ]],
  rocksdb_cache_set_capacity: [js_void, [
    rocksdb_cache_tPointer,
    size_t,
  ]],
  rocksdb_cancel_all_background_work: [js_void, [
    rocksdb_tPointer,
    js_uchar,
  ]],
  rocksdb_checkpoint_create: [js_void, [
    rocksdb_checkpoint_tPointer,
    js_CString,
    uint64_t,
    js_CString,
  ]],
  rocksdb_checkpoint_object_create: [rocksdb_checkpoint_tPointer, [
    rocksdb_tPointer,
    js_CString,
  ]],
  rocksdb_checkpoint_object_destroy: [js_void, [
    rocksdb_checkpoint_tPointer,
  ]],
  rocksdb_close: [js_void, [
    rocksdb_tPointer,
  ]],
  rocksdb_column_family_handle_destroy: [js_void, [
    rocksdb_column_family_handle_tPointer,
  ]],
  rocksdb_compact_range: [js_void, [
    rocksdb_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_compact_range_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_compact_range_cf_opt: [js_void, [
    rocksdb_tPointer,
    rocksdb_column_family_handle_tPointer,
    rocksdb_compactoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_compact_range_opt: [js_void, [
    rocksdb_tPointer,
    rocksdb_compactoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_compactionfilter_create: [rocksdb_compactionfilter_tPointer, [
    js_voidPointer,
    FunctionProto_4,
    FunctionProto_5,
    FunctionProto_6,
  ]],
  rocksdb_compactionfilter_destroy: [js_void, [
    rocksdb_compactionfilter_tPointer,
  ]],
  rocksdb_compactionfilter_set_ignore_snapshots: [js_void, [
    rocksdb_compactionfilter_tPointer,
    js_uchar,
  ]],
  rocksdb_compactionfiltercontext_is_full_compaction: [js_uchar, [
    rocksdb_compactionfiltercontext_tPointer,
  ]],
  rocksdb_compactionfiltercontext_is_manual_compaction: [js_uchar, [
    rocksdb_compactionfiltercontext_tPointer,
  ]],
  rocksdb_compactionfilterfactory_create: [rocksdb_compactionfilterfactory_tPointer, [
    js_voidPointer,
    FunctionProto_7,
    FunctionProto_8,
    FunctionProto_9,
  ]],
  rocksdb_compactionfilterfactory_destroy: [js_void, [
    rocksdb_compactionfilterfactory_tPointer,
  ]],
  rocksdb_compactoptions_create: [rocksdb_compactoptions_tPointer, [
  ]],
  rocksdb_compactoptions_destroy: [js_void, [
    rocksdb_compactoptions_tPointer,
  ]],
  rocksdb_compactoptions_get_bottommost_level_compaction: [js_uchar, [
    rocksdb_compactoptions_tPointer,
  ]],
  rocksdb_compactoptions_get_change_level: [js_uchar, [
    rocksdb_compactoptions_tPointer,
  ]],
  rocksdb_compactoptions_get_exclusive_manual_compaction: [js_uchar, [
    rocksdb_compactoptions_tPointer,
  ]],
  rocksdb_compactoptions_get_target_level: [js_int32, [
    rocksdb_compactoptions_tPointer,
  ]],
  rocksdb_compactoptions_set_bottommost_level_compaction: [js_void, [
    rocksdb_compactoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_compactoptions_set_change_level: [js_void, [
    rocksdb_compactoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_compactoptions_set_exclusive_manual_compaction: [js_void, [
    rocksdb_compactoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_compactoptions_set_target_level: [js_void, [
    rocksdb_compactoptions_tPointer,
    js_int32,
  ]],
  rocksdb_comparator_create: [rocksdb_comparator_tPointer, [
    js_voidPointer,
    FunctionProto_10,
    FunctionProto_11,
    FunctionProto_12,
  ]],
  rocksdb_comparator_destroy: [js_void, [
    rocksdb_comparator_tPointer,
  ]],
  rocksdb_create_column_family: [rocksdb_column_family_handle_tPointer, [
    rocksdb_tPointer,
    rocksdb_options_tPointer,
    js_CString,
    js_CString,
  ]],
  rocksdb_create_column_family_with_ttl: [rocksdb_column_family_handle_tPointer, [
    rocksdb_tPointer,
    rocksdb_options_tPointer,
    js_CString,
    js_int32,
    js_CString,
  ]],
  rocksdb_create_default_env: [rocksdb_env_tPointer, [
  ]],
  rocksdb_create_iterator: [rocksdb_iterator_tPointer, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_create_iterator_cf: [rocksdb_iterator_tPointer, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
  ]],
  rocksdb_create_iterators: [js_void, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    rocksdb_iterator_tPointer,
    size_t,
    js_CString,
  ]],
  rocksdb_create_mem_env: [rocksdb_env_tPointer, [
  ]],
  rocksdb_create_snapshot: [rocksdb_snapshot_tPointer, [
    rocksdb_tPointer,
  ]],
  rocksdb_cuckoo_options_create: [rocksdb_cuckoo_table_options_tPointer, [
  ]],
  rocksdb_cuckoo_options_destroy: [js_void, [
    rocksdb_cuckoo_table_options_tPointer,
  ]],
  rocksdb_cuckoo_options_set_cuckoo_block_size: [js_void, [
    rocksdb_cuckoo_table_options_tPointer,
    uint32_t,
  ]],
  rocksdb_cuckoo_options_set_hash_ratio: [js_void, [
    rocksdb_cuckoo_table_options_tPointer,
    js_double,
  ]],
  rocksdb_cuckoo_options_set_identity_as_first_hash: [js_void, [
    rocksdb_cuckoo_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_cuckoo_options_set_max_search_depth: [js_void, [
    rocksdb_cuckoo_table_options_tPointer,
    uint32_t,
  ]],
  rocksdb_cuckoo_options_set_use_module_hash: [js_void, [
    rocksdb_cuckoo_table_options_tPointer,
    js_uchar,
  ]],
  rocksdb_dbpath_create: [rocksdb_dbpath_tPointer, [
    js_CString,
    uint64_t,
  ]],
  rocksdb_dbpath_destroy: [js_void, [
    rocksdb_dbpath_tPointer,
  ]],
  rocksdb_delete: [js_void, [
    rocksdb_tPointer,
    rocksdb_writeoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_delete_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_delete_file: [js_void, [
    rocksdb_tPointer,
    js_CString,
  ]],
  rocksdb_delete_file_in_range: [js_void, [
    rocksdb_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_delete_file_in_range_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_delete_range_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_destroy_db: [js_void, [
    rocksdb_options_tPointer,
    js_CString,
    js_CString,
  ]],
  rocksdb_disable_file_deletions: [js_void, [
    rocksdb_tPointer,
    js_CString,
  ]],
  rocksdb_drop_column_family: [js_void, [
    rocksdb_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
  ]],
  rocksdb_enable_file_deletions: [js_void, [
    rocksdb_tPointer,
    js_uchar,
    js_CString,
  ]],
  rocksdb_env_destroy: [js_void, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_get_background_threads: [js_int32, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_get_bottom_priority_background_threads: [js_int32, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_get_high_priority_background_threads: [js_int32, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_get_low_priority_background_threads: [js_int32, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_join_all_threads: [js_void, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_lower_high_priority_thread_pool_cpu_priority: [js_void, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_lower_high_priority_thread_pool_io_priority: [js_void, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_lower_thread_pool_cpu_priority: [js_void, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_lower_thread_pool_io_priority: [js_void, [
    rocksdb_env_tPointer,
  ]],
  rocksdb_env_set_background_threads: [js_void, [
    rocksdb_env_tPointer,
    js_int32,
  ]],
  rocksdb_env_set_bottom_priority_background_threads: [js_void, [
    rocksdb_env_tPointer,
    js_int32,
  ]],
  rocksdb_env_set_high_priority_background_threads: [js_void, [
    rocksdb_env_tPointer,
    js_int32,
  ]],
  rocksdb_env_set_low_priority_background_threads: [js_void, [
    rocksdb_env_tPointer,
    js_int32,
  ]],
  rocksdb_envoptions_create: [rocksdb_envoptions_tPointer, [
  ]],
  rocksdb_envoptions_destroy: [js_void, [
    rocksdb_envoptions_tPointer,
  ]],
  rocksdb_fifo_compaction_options_create: [rocksdb_fifo_compaction_options_tPointer, [
  ]],
  rocksdb_fifo_compaction_options_destroy: [js_void, [
    rocksdb_fifo_compaction_options_tPointer,
  ]],
  rocksdb_fifo_compaction_options_get_max_table_files_size: [uint64_t, [
    rocksdb_fifo_compaction_options_tPointer,
  ]],
  rocksdb_fifo_compaction_options_set_max_table_files_size: [js_void, [
    rocksdb_fifo_compaction_options_tPointer,
    uint64_t,
  ]],
  rocksdb_filterpolicy_create: [rocksdb_filterpolicy_tPointer, [
    js_voidPointer,
    FunctionProto_13,
    FunctionProto_14,
    FunctionProto_15,
    FunctionProto_16,
    FunctionProto_17,
  ]],
  rocksdb_filterpolicy_create_bloom: [rocksdb_filterpolicy_tPointer, [
    js_int32,
  ]],
  rocksdb_filterpolicy_create_bloom_full: [rocksdb_filterpolicy_tPointer, [
    js_int32,
  ]],
  rocksdb_filterpolicy_destroy: [js_void, [
    rocksdb_filterpolicy_tPointer,
  ]],
  rocksdb_flush: [js_void, [
    rocksdb_tPointer,
    rocksdb_flushoptions_tPointer,
    js_CString,
  ]],
  rocksdb_flush_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_flushoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
  ]],
  rocksdb_flushoptions_create: [rocksdb_flushoptions_tPointer, [
  ]],
  rocksdb_flushoptions_destroy: [js_void, [
    rocksdb_flushoptions_tPointer,
  ]],
  rocksdb_flushoptions_get_wait: [js_uchar, [
    rocksdb_flushoptions_tPointer,
  ]],
  rocksdb_flushoptions_set_wait: [js_void, [
    rocksdb_flushoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_free: [js_void, [
    js_voidPointer,
  ]],
  rocksdb_get: [js_CString, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_get_cf: [js_CString, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_get_latest_sequence_number: [uint64_t, [
    rocksdb_tPointer,
  ]],
  rocksdb_get_options_from_string: [js_void, [
    rocksdb_options_tPointer,
    js_CString,
    rocksdb_options_tPointer,
    js_CString,
  ]],
  rocksdb_get_pinned: [rocksdb_pinnableslice_tPointer, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_get_pinned_cf: [rocksdb_pinnableslice_tPointer, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_get_updates_since: [rocksdb_wal_iterator_tPointer, [
    rocksdb_tPointer,
    uint64_t,
    rocksdb_wal_readoptions_tPointer,
    js_CString,
  ]],
  rocksdb_ingest_external_file: [js_void, [
    rocksdb_tPointer,
    js_CString,
    size_t,
    rocksdb_ingestexternalfileoptions_tPointer,
    js_CString,
  ]],
  rocksdb_ingest_external_file_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    rocksdb_ingestexternalfileoptions_tPointer,
    js_CString,
  ]],
  rocksdb_ingestexternalfileoptions_create: [rocksdb_ingestexternalfileoptions_tPointer, [
  ]],
  rocksdb_ingestexternalfileoptions_destroy: [js_void, [
    rocksdb_ingestexternalfileoptions_tPointer,
  ]],
  rocksdb_ingestexternalfileoptions_set_allow_blocking_flush: [js_void, [
    rocksdb_ingestexternalfileoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_ingestexternalfileoptions_set_allow_global_seqno: [js_void, [
    rocksdb_ingestexternalfileoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_ingestexternalfileoptions_set_ingest_behind: [js_void, [
    rocksdb_ingestexternalfileoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_ingestexternalfileoptions_set_move_files: [js_void, [
    rocksdb_ingestexternalfileoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_ingestexternalfileoptions_set_snapshot_consistency: [js_void, [
    rocksdb_ingestexternalfileoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_iter_destroy: [js_void, [
    rocksdb_iterator_tPointer,
  ]],
  rocksdb_iter_get_error: [js_void, [
    rocksdb_iterator_tPointer,
    js_CString,
  ]],
  rocksdb_iter_key: [js_CString, [
    rocksdb_iterator_tPointer,
    size_tPointer,
  ]],
  rocksdb_iter_next: [js_void, [
    rocksdb_iterator_tPointer,
  ]],
  rocksdb_iter_prev: [js_void, [
    rocksdb_iterator_tPointer,
  ]],
  rocksdb_iter_seek: [js_void, [
    rocksdb_iterator_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_iter_seek_for_prev: [js_void, [
    rocksdb_iterator_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_iter_seek_to_first: [js_void, [
    rocksdb_iterator_tPointer,
  ]],
  rocksdb_iter_seek_to_last: [js_void, [
    rocksdb_iterator_tPointer,
  ]],
  rocksdb_iter_valid: [js_uchar, [
    rocksdb_iterator_tPointer,
  ]],
  rocksdb_iter_value: [js_CString, [
    rocksdb_iterator_tPointer,
    size_tPointer,
  ]],
  rocksdb_key_may_exist: [js_uchar, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_tPointer,
    js_CString,
    size_t,
    js_ucharPointer,
  ]],
  rocksdb_key_may_exist_cf: [js_uchar, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_tPointer,
    js_CString,
    size_t,
    js_ucharPointer,
  ]],
  rocksdb_list_column_families: [js_CString, [
    rocksdb_options_tPointer,
    js_CString,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_list_column_families_destroy: [js_void, [
    js_CString,
    size_t,
  ]],
  rocksdb_livefiles: [rocksdb_livefiles_tPointer, [
    rocksdb_tPointer,
  ]],
  rocksdb_livefiles_count: [js_int32, [
    rocksdb_livefiles_tPointer,
  ]],
  rocksdb_livefiles_deletions: [uint64_t, [
    rocksdb_livefiles_tPointer,
    js_int32,
  ]],
  rocksdb_livefiles_destroy: [js_void, [
    rocksdb_livefiles_tPointer,
  ]],
  rocksdb_livefiles_entries: [uint64_t, [
    rocksdb_livefiles_tPointer,
    js_int32,
  ]],
  rocksdb_livefiles_largestkey: [js_CString, [
    rocksdb_livefiles_tPointer,
    js_int32,
    size_tPointer,
  ]],
  rocksdb_livefiles_level: [js_int32, [
    rocksdb_livefiles_tPointer,
    js_int32,
  ]],
  rocksdb_livefiles_name: [js_CString, [
    rocksdb_livefiles_tPointer,
    js_int32,
  ]],
  rocksdb_livefiles_size: [size_t, [
    rocksdb_livefiles_tPointer,
    js_int32,
  ]],
  rocksdb_livefiles_smallestkey: [js_CString, [
    rocksdb_livefiles_tPointer,
    js_int32,
    size_tPointer,
  ]],
  rocksdb_memory_consumers_add_cache: [js_void, [
    rocksdb_memory_consumers_tPointer,
    rocksdb_cache_tPointer,
  ]],
  rocksdb_memory_consumers_add_db: [js_void, [
    rocksdb_memory_consumers_tPointer,
    rocksdb_tPointer,
  ]],
  rocksdb_memory_consumers_create: [rocksdb_memory_consumers_tPointer, [
  ]],
  rocksdb_memory_consumers_destroy: [js_void, [
    rocksdb_memory_consumers_tPointer,
  ]],
  rocksdb_merge: [js_void, [
    rocksdb_tPointer,
    rocksdb_writeoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_merge_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_mergeoperator_create: [rocksdb_mergeoperator_tPointer, [
    js_voidPointer,
    FunctionProto_18,
    FunctionProto_19,
    FunctionProto_20,
    FunctionProto_21,
    FunctionProto_22,
  ]],
  rocksdb_mergeoperator_destroy: [js_void, [
    rocksdb_mergeoperator_tPointer,
  ]],
  rocksdb_multi_get: [js_void, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    size_t,
    js_CString,
    size_tPointer,
    js_CString,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_multi_get_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    size_t,
    js_CString,
    size_tPointer,
    js_CString,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_open: [rocksdb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_CString,
  ]],
  rocksdb_open_as_secondary: [rocksdb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_CString,
    js_CString,
  ]],
  rocksdb_open_as_secondary_column_families: [rocksdb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_CString,
    js_int32,
    js_CString,
    rocksdb_options_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
  ]],
  rocksdb_open_column_families: [rocksdb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_int32,
    js_CString,
    rocksdb_options_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
  ]],
  rocksdb_open_column_families_with_ttl: [rocksdb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_int32,
    js_CString,
    rocksdb_options_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32Pointer,
    js_CString,
  ]],
  rocksdb_open_for_read_only: [rocksdb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_uchar,
    js_CString,
  ]],
  rocksdb_open_for_read_only_column_families: [rocksdb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_int32,
    js_CString,
    rocksdb_options_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_uchar,
    js_CString,
  ]],
  rocksdb_open_with_ttl: [rocksdb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_int32,
    js_CString,
  ]],
  rocksdb_optimistictransaction_begin: [rocksdb_transaction_tPointer, [
    rocksdb_optimistictransactiondb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_optimistictransaction_options_tPointer,
    rocksdb_transaction_tPointer,
  ]],
  rocksdb_optimistictransaction_options_create: [rocksdb_optimistictransaction_options_tPointer, [
  ]],
  rocksdb_optimistictransaction_options_destroy: [js_void, [
    rocksdb_optimistictransaction_options_tPointer,
  ]],
  rocksdb_optimistictransaction_options_set_set_snapshot: [js_void, [
    rocksdb_optimistictransaction_options_tPointer,
    js_uchar,
  ]],
  rocksdb_optimistictransactiondb_close: [js_void, [
    rocksdb_optimistictransactiondb_tPointer,
  ]],
  rocksdb_optimistictransactiondb_close_base_db: [js_void, [
    rocksdb_tPointer,
  ]],
  rocksdb_optimistictransactiondb_get_base_db: [rocksdb_tPointer, [
    rocksdb_optimistictransactiondb_tPointer,
  ]],
  rocksdb_optimistictransactiondb_open: [rocksdb_optimistictransactiondb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_CString,
  ]],
  rocksdb_optimistictransactiondb_open_column_families: [rocksdb_optimistictransactiondb_tPointer, [
    rocksdb_options_tPointer,
    js_CString,
    js_int32,
    js_CString,
    rocksdb_options_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
  ]],
  rocksdb_options_compaction_readahead_size: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_create: [rocksdb_options_tPointer, [
  ]],
  rocksdb_options_create_copy: [rocksdb_options_tPointer, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_destroy: [js_void, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_enable_statistics: [js_void, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_WAL_size_limit_MB: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_WAL_ttl_seconds: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_access_hint_on_compaction_start: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_advise_random_on_open: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_allow_concurrent_memtable_write: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_allow_ingest_behind: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_allow_mmap_reads: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_allow_mmap_writes: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_arena_block_size: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_atomic_flush: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_base_background_compactions: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_blob_compression_type: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_blob_file_size: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_blob_gc_age_cutoff: [js_double, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_bloom_locality: [uint32_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_bottommost_compression: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_bytes_per_sync: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_compaction_readahead_size: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_compaction_style: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_compression: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_create_if_missing: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_create_missing_column_families: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_db_write_buffer_size: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_delete_obsolete_files_period_micros: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_disable_auto_compactions: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_enable_blob_files: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_enable_blob_gc: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_enable_pipelined_write: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_enable_write_thread_adaptive_yield: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_error_if_exists: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_hard_pending_compaction_bytes_limit: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_hard_rate_limit: [js_double, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_info_log_level: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_inplace_update_num_locks: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_inplace_update_support: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_is_fd_close_on_exec: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_keep_log_file_num: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_level0_file_num_compaction_trigger: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_level0_slowdown_writes_trigger: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_level0_stop_writes_trigger: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_level_compaction_dynamic_level_bytes: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_log_file_time_to_roll: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_manifest_preallocation_size: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_background_compactions: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_background_flushes: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_background_jobs: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_bytes_for_level_base: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_bytes_for_level_multiplier: [js_double, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_compaction_bytes: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_file_opening_threads: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_log_file_size: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_manifest_file_size: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_open_files: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_sequential_skip_in_iterations: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_subcompactions: [uint32_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_successive_merges: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_total_wal_size: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_write_buffer_number: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_write_buffer_number_to_maintain: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_max_write_buffer_size_to_maintain: [int64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_memtable_huge_page_size: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_memtable_prefix_bloom_size_ratio: [js_double, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_min_blob_size: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_min_write_buffer_number_to_merge: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_num_levels: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_optimize_filters_for_hits: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_paranoid_checks: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_rate_limit_delay_max_milliseconds: [js_uint32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_recycle_log_file_num: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_report_bg_io_stats: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_skip_checking_sst_file_sizes_on_db_open: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_skip_log_error_on_recovery: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_skip_stats_update_on_db_open: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_soft_pending_compaction_bytes_limit: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_soft_rate_limit: [js_double, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_stats_dump_period_sec: [js_uint32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_stats_persist_period_sec: [js_uint32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_table_cache_numshardbits: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_target_file_size_base: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_target_file_size_multiplier: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_unordered_write: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_use_adaptive_mutex: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_use_direct_io_for_flush_and_compaction: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_use_direct_reads: [js_uchar, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_use_fsync: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_wal_bytes_per_sync: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_wal_recovery_mode: [js_int32, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_writable_file_max_buffer_size: [uint64_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_get_write_buffer_size: [size_t, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_increase_parallelism: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_optimize_for_point_lookup: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_optimize_level_style_compaction: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_optimize_universal_style_compaction: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_prepare_for_bulk_load: [js_void, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_set_WAL_size_limit_MB: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_WAL_ttl_seconds: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_access_hint_on_compaction_start: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_advise_random_on_open: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_allow_concurrent_memtable_write: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_allow_ingest_behind: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_allow_mmap_reads: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_allow_mmap_writes: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_arena_block_size: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_atomic_flush: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_base_background_compactions: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_blob_compression_type: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_blob_file_size: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_blob_gc_age_cutoff: [js_void, [
    rocksdb_options_tPointer,
    js_double,
  ]],
  rocksdb_options_set_block_based_table_factory: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_block_based_table_options_tPointer,
  ]],
  rocksdb_options_set_bloom_locality: [js_void, [
    rocksdb_options_tPointer,
    uint32_t,
  ]],
  rocksdb_options_set_bottommost_compression: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_bottommost_compression_options: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
    js_int32,
    js_int32,
    js_int32,
    js_uchar,
  ]],
  rocksdb_options_set_bottommost_compression_options_max_dict_buffer_bytes: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
    js_uchar,
  ]],
  rocksdb_options_set_bottommost_compression_options_zstd_max_train_bytes: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
    js_uchar,
  ]],
  rocksdb_options_set_bytes_per_sync: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_compaction_filter: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_compactionfilter_tPointer,
  ]],
  rocksdb_options_set_compaction_filter_factory: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_compactionfilterfactory_tPointer,
  ]],
  rocksdb_options_set_compaction_style: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_comparator: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_comparator_tPointer,
  ]],
  rocksdb_options_set_compression: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_compression_options: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
    js_int32,
    js_int32,
    js_int32,
  ]],
  rocksdb_options_set_compression_options_max_dict_buffer_bytes: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_compression_options_zstd_max_train_bytes: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_compression_per_level: [js_void, [
    rocksdb_options_tPointer,
    js_int32Pointer,
    size_t,
  ]],
  rocksdb_options_set_create_if_missing: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_create_missing_column_families: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_cuckoo_table_factory: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_cuckoo_table_options_tPointer,
  ]],
  rocksdb_options_set_db_log_dir: [js_void, [
    rocksdb_options_tPointer,
    js_CString,
  ]],
  rocksdb_options_set_db_paths: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_dbpath_tPointer,
    size_t,
  ]],
  rocksdb_options_set_db_write_buffer_size: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_delete_obsolete_files_period_micros: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_disable_auto_compactions: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_dump_malloc_stats: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_enable_blob_files: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_enable_blob_gc: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_enable_pipelined_write: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_enable_write_thread_adaptive_yield: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_env: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_env_tPointer,
  ]],
  rocksdb_options_set_error_if_exists: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_fifo_compaction_options: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_fifo_compaction_options_tPointer,
  ]],
  rocksdb_options_set_hard_pending_compaction_bytes_limit: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_hard_rate_limit: [js_void, [
    rocksdb_options_tPointer,
    js_double,
  ]],
  rocksdb_options_set_hash_link_list_rep: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_hash_skip_list_rep: [js_void, [
    rocksdb_options_tPointer,
    size_t,
    int32_t,
    int32_t,
  ]],
  rocksdb_options_set_info_log: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_logger_tPointer,
  ]],
  rocksdb_options_set_info_log_level: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_inplace_update_num_locks: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_inplace_update_support: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_is_fd_close_on_exec: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_keep_log_file_num: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_level0_file_num_compaction_trigger: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_level0_slowdown_writes_trigger: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_level0_stop_writes_trigger: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_level_compaction_dynamic_level_bytes: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_log_file_time_to_roll: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_manifest_preallocation_size: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_max_background_compactions: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_max_background_flushes: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_max_background_jobs: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_max_bytes_for_level_base: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_max_bytes_for_level_multiplier: [js_void, [
    rocksdb_options_tPointer,
    js_double,
  ]],
  rocksdb_options_set_max_bytes_for_level_multiplier_additional: [js_void, [
    rocksdb_options_tPointer,
    js_int32Pointer,
    size_t,
  ]],
  rocksdb_options_set_max_compaction_bytes: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_max_file_opening_threads: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_max_log_file_size: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_max_manifest_file_size: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_max_mem_compaction_level: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_max_open_files: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_max_sequential_skip_in_iterations: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_max_subcompactions: [js_void, [
    rocksdb_options_tPointer,
    uint32_t,
  ]],
  rocksdb_options_set_max_successive_merges: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_max_total_wal_size: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_max_write_buffer_number: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_max_write_buffer_number_to_maintain: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_max_write_buffer_size_to_maintain: [js_void, [
    rocksdb_options_tPointer,
    int64_t,
  ]],
  rocksdb_options_set_memtable_huge_page_size: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_memtable_prefix_bloom_size_ratio: [js_void, [
    rocksdb_options_tPointer,
    js_double,
  ]],
  rocksdb_options_set_memtable_vector_rep: [js_void, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_set_memtable_whole_key_filtering: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_merge_operator: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_mergeoperator_tPointer,
  ]],
  rocksdb_options_set_min_blob_size: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_min_level_to_compress: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_min_write_buffer_number_to_merge: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_num_levels: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_optimize_filters_for_hits: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_paranoid_checks: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_plain_table_factory: [js_void, [
    rocksdb_options_tPointer,
    uint32_t,
    js_int32,
    js_double,
    size_t,
  ]],
  rocksdb_options_set_prefix_extractor: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_slicetransform_tPointer,
  ]],
  rocksdb_options_set_purge_redundant_kvs_while_flush: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_rate_limit_delay_max_milliseconds: [js_void, [
    rocksdb_options_tPointer,
    js_uint32,
  ]],
  rocksdb_options_set_ratelimiter: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_ratelimiter_tPointer,
  ]],
  rocksdb_options_set_recycle_log_file_num: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_report_bg_io_stats: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_row_cache: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_cache_tPointer,
  ]],
  rocksdb_options_set_skip_checking_sst_file_sizes_on_db_open: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_skip_log_error_on_recovery: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_skip_stats_update_on_db_open: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_soft_pending_compaction_bytes_limit: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_set_soft_rate_limit: [js_void, [
    rocksdb_options_tPointer,
    js_double,
  ]],
  rocksdb_options_set_stats_dump_period_sec: [js_void, [
    rocksdb_options_tPointer,
    js_uint32,
  ]],
  rocksdb_options_set_stats_persist_period_sec: [js_void, [
    rocksdb_options_tPointer,
    js_uint32,
  ]],
  rocksdb_options_set_table_cache_numshardbits: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_table_cache_remove_scan_count_limit: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_target_file_size_base: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_target_file_size_multiplier: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_uint64add_merge_operator: [js_void, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_options_set_universal_compaction_options: [js_void, [
    rocksdb_options_tPointer,
    rocksdb_universal_compaction_options_tPointer,
  ]],
  rocksdb_options_set_unordered_write: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_use_adaptive_mutex: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_use_direct_io_for_flush_and_compaction: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_use_direct_reads: [js_void, [
    rocksdb_options_tPointer,
    js_uchar,
  ]],
  rocksdb_options_set_use_fsync: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_wal_bytes_per_sync: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_wal_dir: [js_void, [
    rocksdb_options_tPointer,
    js_CString,
  ]],
  rocksdb_options_set_wal_recovery_mode: [js_void, [
    rocksdb_options_tPointer,
    js_int32,
  ]],
  rocksdb_options_set_writable_file_max_buffer_size: [js_void, [
    rocksdb_options_tPointer,
    uint64_t,
  ]],
  rocksdb_options_set_write_buffer_size: [js_void, [
    rocksdb_options_tPointer,
    size_t,
  ]],
  rocksdb_options_statistics_get_string: [js_CString, [
    rocksdb_options_tPointer,
  ]],
  rocksdb_perfcontext_create: [rocksdb_perfcontext_tPointer, [
  ]],
  rocksdb_perfcontext_destroy: [js_void, [
    rocksdb_perfcontext_tPointer,
  ]],
  rocksdb_perfcontext_metric: [uint64_t, [
    rocksdb_perfcontext_tPointer,
    js_int32,
  ]],
  rocksdb_perfcontext_report: [js_CString, [
    rocksdb_perfcontext_tPointer,
    js_uchar,
  ]],
  rocksdb_perfcontext_reset: [js_void, [
    rocksdb_perfcontext_tPointer,
  ]],
  rocksdb_pinnableslice_destroy: [js_void, [
    rocksdb_pinnableslice_tPointer,
  ]],
  rocksdb_pinnableslice_value: [js_CString, [
    rocksdb_pinnableslice_tPointer,
    size_tPointer,
  ]],
  rocksdb_property_int: [js_int32, [
    rocksdb_tPointer,
    js_CString,
    uint64_tPointer,
  ]],
  rocksdb_property_int_cf: [js_int32, [
    rocksdb_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    uint64_tPointer,
  ]],
  rocksdb_property_value: [js_CString, [
    rocksdb_tPointer,
    js_CString,
  ]],
  rocksdb_property_value_cf: [js_CString, [
    rocksdb_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
  ]],
  rocksdb_put: [js_void, [
    rocksdb_tPointer,
    rocksdb_writeoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_put_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_ratelimiter_create: [rocksdb_ratelimiter_tPointer, [
    int64_t,
    int64_t,
    int32_t,
  ]],
  rocksdb_ratelimiter_destroy: [js_void, [
    rocksdb_ratelimiter_tPointer,
  ]],
  rocksdb_readoptions_create: [rocksdb_readoptions_tPointer, [
  ]],
  rocksdb_readoptions_destroy: [js_void, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_background_purge_on_iterator_cleanup: [js_uchar, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_deadline: [uint64_t, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_fill_cache: [js_uchar, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_ignore_range_deletions: [js_uchar, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_io_timeout: [uint64_t, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_max_skippable_internal_keys: [uint64_t, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_pin_data: [js_uchar, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_prefix_same_as_start: [js_uchar, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_read_tier: [js_int32, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_readahead_size: [size_t, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_tailing: [js_uchar, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_total_order_seek: [js_uchar, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_get_verify_checksums: [js_uchar, [
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_readoptions_set_background_purge_on_iterator_cleanup: [js_void, [
    rocksdb_readoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_readoptions_set_deadline: [js_void, [
    rocksdb_readoptions_tPointer,
    uint64_t,
  ]],
  rocksdb_readoptions_set_fill_cache: [js_void, [
    rocksdb_readoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_readoptions_set_ignore_range_deletions: [js_void, [
    rocksdb_readoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_readoptions_set_io_timeout: [js_void, [
    rocksdb_readoptions_tPointer,
    uint64_t,
  ]],
  rocksdb_readoptions_set_iterate_lower_bound: [js_void, [
    rocksdb_readoptions_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_readoptions_set_iterate_upper_bound: [js_void, [
    rocksdb_readoptions_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_readoptions_set_managed: [js_void, [
    rocksdb_readoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_readoptions_set_max_skippable_internal_keys: [js_void, [
    rocksdb_readoptions_tPointer,
    uint64_t,
  ]],
  rocksdb_readoptions_set_pin_data: [js_void, [
    rocksdb_readoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_readoptions_set_prefix_same_as_start: [js_void, [
    rocksdb_readoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_readoptions_set_read_tier: [js_void, [
    rocksdb_readoptions_tPointer,
    js_int32,
  ]],
  rocksdb_readoptions_set_readahead_size: [js_void, [
    rocksdb_readoptions_tPointer,
    size_t,
  ]],
  rocksdb_readoptions_set_snapshot: [js_void, [
    rocksdb_readoptions_tPointer,
    rocksdb_snapshot_tPointer,
  ]],
  rocksdb_readoptions_set_tailing: [js_void, [
    rocksdb_readoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_readoptions_set_total_order_seek: [js_void, [
    rocksdb_readoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_readoptions_set_verify_checksums: [js_void, [
    rocksdb_readoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_release_snapshot: [js_void, [
    rocksdb_tPointer,
    rocksdb_snapshot_tPointer,
  ]],
  rocksdb_repair_db: [js_void, [
    rocksdb_options_tPointer,
    js_CString,
    js_CString,
  ]],
  rocksdb_restore_options_create: [rocksdb_restore_options_tPointer, [
  ]],
  rocksdb_restore_options_destroy: [js_void, [
    rocksdb_restore_options_tPointer,
  ]],
  rocksdb_restore_options_set_keep_log_files: [js_void, [
    rocksdb_restore_options_tPointer,
    js_int32,
  ]],
  rocksdb_set_options: [js_void, [
    rocksdb_tPointer,
    js_int32,
    js_voidPointer,
    js_voidPointer,
    js_CString,
  ]],
  rocksdb_set_options_cf: [js_void, [
    rocksdb_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_voidPointer,
    js_voidPointer,
    js_CString,
  ]],
  rocksdb_set_perf_level: [js_void, [
    js_int32,
  ]],
  rocksdb_slicetransform_create: [rocksdb_slicetransform_tPointer, [
    js_voidPointer,
    FunctionProto_23,
    FunctionProto_24,
    FunctionProto_25,
    FunctionProto_26,
    FunctionProto_27,
  ]],
  rocksdb_slicetransform_create_fixed_prefix: [rocksdb_slicetransform_tPointer, [
    size_t,
  ]],
  rocksdb_slicetransform_create_noop: [rocksdb_slicetransform_tPointer, [
  ]],
  rocksdb_slicetransform_destroy: [js_void, [
    rocksdb_slicetransform_tPointer,
  ]],
  rocksdb_sstfilewriter_add: [js_void, [
    rocksdb_sstfilewriter_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_sstfilewriter_create: [rocksdb_sstfilewriter_tPointer, [
    rocksdb_envoptions_tPointer,
    rocksdb_options_tPointer,
  ]],
  rocksdb_sstfilewriter_create_with_comparator: [rocksdb_sstfilewriter_tPointer, [
    rocksdb_envoptions_tPointer,
    rocksdb_options_tPointer,
    rocksdb_comparator_tPointer,
  ]],
  rocksdb_sstfilewriter_delete: [js_void, [
    rocksdb_sstfilewriter_tPointer,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_sstfilewriter_destroy: [js_void, [
    rocksdb_sstfilewriter_tPointer,
  ]],
  rocksdb_sstfilewriter_file_size: [js_void, [
    rocksdb_sstfilewriter_tPointer,
    uint64_tPointer,
  ]],
  rocksdb_sstfilewriter_finish: [js_void, [
    rocksdb_sstfilewriter_tPointer,
    js_CString,
  ]],
  rocksdb_sstfilewriter_merge: [js_void, [
    rocksdb_sstfilewriter_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_sstfilewriter_open: [js_void, [
    rocksdb_sstfilewriter_tPointer,
    js_CString,
    js_CString,
  ]],
  rocksdb_sstfilewriter_put: [js_void, [
    rocksdb_sstfilewriter_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transaction_begin: [rocksdb_transaction_tPointer, [
    rocksdb_transactiondb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_transaction_options_tPointer,
    rocksdb_transaction_tPointer,
  ]],
  rocksdb_transaction_commit: [js_void, [
    rocksdb_transaction_tPointer,
    js_CString,
  ]],
  rocksdb_transaction_create_iterator: [rocksdb_iterator_tPointer, [
    rocksdb_transaction_tPointer,
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_transaction_create_iterator_cf: [rocksdb_iterator_tPointer, [
    rocksdb_transaction_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
  ]],
  rocksdb_transaction_delete: [js_void, [
    rocksdb_transaction_tPointer,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transaction_delete_cf: [js_void, [
    rocksdb_transaction_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transaction_destroy: [js_void, [
    rocksdb_transaction_tPointer,
  ]],
  rocksdb_transaction_get: [js_CString, [
    rocksdb_transaction_tPointer,
    rocksdb_readoptions_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_transaction_get_cf: [js_CString, [
    rocksdb_transaction_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_transaction_get_for_update: [js_CString, [
    rocksdb_transaction_tPointer,
    rocksdb_readoptions_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_uchar,
    js_CString,
  ]],
  rocksdb_transaction_get_for_update_cf: [js_CString, [
    rocksdb_transaction_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_uchar,
    js_CString,
  ]],
  rocksdb_transaction_get_snapshot: [rocksdb_snapshot_tPointer, [
    rocksdb_transaction_tPointer,
  ]],
  rocksdb_transaction_merge: [js_void, [
    rocksdb_transaction_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transaction_merge_cf: [js_void, [
    rocksdb_transaction_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transaction_options_create: [rocksdb_transaction_options_tPointer, [
  ]],
  rocksdb_transaction_options_destroy: [js_void, [
    rocksdb_transaction_options_tPointer,
  ]],
  rocksdb_transaction_options_set_deadlock_detect: [js_void, [
    rocksdb_transaction_options_tPointer,
    js_uchar,
  ]],
  rocksdb_transaction_options_set_deadlock_detect_depth: [js_void, [
    rocksdb_transaction_options_tPointer,
    int64_t,
  ]],
  rocksdb_transaction_options_set_expiration: [js_void, [
    rocksdb_transaction_options_tPointer,
    int64_t,
  ]],
  rocksdb_transaction_options_set_lock_timeout: [js_void, [
    rocksdb_transaction_options_tPointer,
    int64_t,
  ]],
  rocksdb_transaction_options_set_max_write_batch_size: [js_void, [
    rocksdb_transaction_options_tPointer,
    size_t,
  ]],
  rocksdb_transaction_options_set_set_snapshot: [js_void, [
    rocksdb_transaction_options_tPointer,
    js_uchar,
  ]],
  rocksdb_transaction_put: [js_void, [
    rocksdb_transaction_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transaction_put_cf: [js_void, [
    rocksdb_transaction_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transaction_rollback: [js_void, [
    rocksdb_transaction_tPointer,
    js_CString,
  ]],
  rocksdb_transaction_rollback_to_savepoint: [js_void, [
    rocksdb_transaction_tPointer,
    js_CString,
  ]],
  rocksdb_transaction_set_savepoint: [js_void, [
    rocksdb_transaction_tPointer,
  ]],
  rocksdb_transactiondb_checkpoint_object_create: [rocksdb_checkpoint_tPointer, [
    rocksdb_transactiondb_tPointer,
    js_CString,
  ]],
  rocksdb_transactiondb_close: [js_void, [
    rocksdb_transactiondb_tPointer,
  ]],
  rocksdb_transactiondb_create_column_family: [rocksdb_column_family_handle_tPointer, [
    rocksdb_transactiondb_tPointer,
    rocksdb_options_tPointer,
    js_CString,
    js_CString,
  ]],
  rocksdb_transactiondb_create_iterator: [rocksdb_iterator_tPointer, [
    rocksdb_transactiondb_tPointer,
    rocksdb_readoptions_tPointer,
  ]],
  rocksdb_transactiondb_create_iterator_cf: [rocksdb_iterator_tPointer, [
    rocksdb_transactiondb_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
  ]],
  rocksdb_transactiondb_create_snapshot: [rocksdb_snapshot_tPointer, [
    rocksdb_transactiondb_tPointer,
  ]],
  rocksdb_transactiondb_delete: [js_void, [
    rocksdb_transactiondb_tPointer,
    rocksdb_writeoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transactiondb_delete_cf: [js_void, [
    rocksdb_transactiondb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transactiondb_get: [js_CString, [
    rocksdb_transactiondb_tPointer,
    rocksdb_readoptions_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_transactiondb_get_cf: [js_CString, [
    rocksdb_transactiondb_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_transactiondb_merge: [js_void, [
    rocksdb_transactiondb_tPointer,
    rocksdb_writeoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transactiondb_merge_cf: [js_void, [
    rocksdb_transactiondb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transactiondb_open: [rocksdb_transactiondb_tPointer, [
    rocksdb_options_tPointer,
    rocksdb_transactiondb_options_tPointer,
    js_CString,
    js_CString,
  ]],
  rocksdb_transactiondb_open_column_families: [rocksdb_transactiondb_tPointer, [
    rocksdb_options_tPointer,
    rocksdb_transactiondb_options_tPointer,
    js_CString,
    js_int32,
    js_CString,
    rocksdb_options_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
  ]],
  rocksdb_transactiondb_options_create: [rocksdb_transactiondb_options_tPointer, [
  ]],
  rocksdb_transactiondb_options_destroy: [js_void, [
    rocksdb_transactiondb_options_tPointer,
  ]],
  rocksdb_transactiondb_options_set_default_lock_timeout: [js_void, [
    rocksdb_transactiondb_options_tPointer,
    int64_t,
  ]],
  rocksdb_transactiondb_options_set_max_num_locks: [js_void, [
    rocksdb_transactiondb_options_tPointer,
    int64_t,
  ]],
  rocksdb_transactiondb_options_set_num_stripes: [js_void, [
    rocksdb_transactiondb_options_tPointer,
    size_t,
  ]],
  rocksdb_transactiondb_options_set_transaction_lock_timeout: [js_void, [
    rocksdb_transactiondb_options_tPointer,
    int64_t,
  ]],
  rocksdb_transactiondb_put: [js_void, [
    rocksdb_transactiondb_tPointer,
    rocksdb_writeoptions_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transactiondb_put_cf: [js_void, [
    rocksdb_transactiondb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
    js_CString,
  ]],
  rocksdb_transactiondb_release_snapshot: [js_void, [
    rocksdb_transactiondb_tPointer,
    rocksdb_snapshot_tPointer,
  ]],
  rocksdb_transactiondb_write: [js_void, [
    rocksdb_transactiondb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_writebatch_tPointer,
    js_CString,
  ]],
  rocksdb_try_catch_up_with_primary: [js_void, [
    rocksdb_tPointer,
    js_CString,
  ]],
  rocksdb_universal_compaction_options_create: [rocksdb_universal_compaction_options_tPointer, [
  ]],
  rocksdb_universal_compaction_options_destroy: [js_void, [
    rocksdb_universal_compaction_options_tPointer,
  ]],
  rocksdb_universal_compaction_options_get_compression_size_percent: [js_int32, [
    rocksdb_universal_compaction_options_tPointer,
  ]],
  rocksdb_universal_compaction_options_get_max_merge_width: [js_int32, [
    rocksdb_universal_compaction_options_tPointer,
  ]],
  rocksdb_universal_compaction_options_get_max_size_amplification_percent: [js_int32, [
    rocksdb_universal_compaction_options_tPointer,
  ]],
  rocksdb_universal_compaction_options_get_min_merge_width: [js_int32, [
    rocksdb_universal_compaction_options_tPointer,
  ]],
  rocksdb_universal_compaction_options_get_size_ratio: [js_int32, [
    rocksdb_universal_compaction_options_tPointer,
  ]],
  rocksdb_universal_compaction_options_get_stop_style: [js_int32, [
    rocksdb_universal_compaction_options_tPointer,
  ]],
  rocksdb_universal_compaction_options_set_compression_size_percent: [js_void, [
    rocksdb_universal_compaction_options_tPointer,
    js_int32,
  ]],
  rocksdb_universal_compaction_options_set_max_merge_width: [js_void, [
    rocksdb_universal_compaction_options_tPointer,
    js_int32,
  ]],
  rocksdb_universal_compaction_options_set_max_size_amplification_percent: [js_void, [
    rocksdb_universal_compaction_options_tPointer,
    js_int32,
  ]],
  rocksdb_universal_compaction_options_set_min_merge_width: [js_void, [
    rocksdb_universal_compaction_options_tPointer,
    js_int32,
  ]],
  rocksdb_universal_compaction_options_set_size_ratio: [js_void, [
    rocksdb_universal_compaction_options_tPointer,
    js_int32,
  ]],
  rocksdb_universal_compaction_options_set_stop_style: [js_void, [
    rocksdb_universal_compaction_options_tPointer,
    js_int32,
  ]],
  rocksdb_wal_iter_destroy: [js_void, [
    rocksdb_wal_iterator_tPointer,
  ]],
  rocksdb_wal_iter_get_batch: [rocksdb_writebatch_tPointer, [
    rocksdb_wal_iterator_tPointer,
    uint64_tPointer,
  ]],
  rocksdb_wal_iter_next: [js_void, [
    rocksdb_wal_iterator_tPointer,
  ]],
  rocksdb_wal_iter_status: [js_void, [
    rocksdb_wal_iterator_tPointer,
    js_CString,
  ]],
  rocksdb_wal_iter_valid: [js_uchar, [
    rocksdb_wal_iterator_tPointer,
  ]],
  rocksdb_write: [js_void, [
    rocksdb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_writebatch_tPointer,
    js_CString,
  ]],
  rocksdb_write_writebatch_wi: [js_void, [
    rocksdb_tPointer,
    rocksdb_writeoptions_tPointer,
    rocksdb_writebatch_wi_tPointer,
    js_CString,
  ]],
  rocksdb_writebatch_clear: [js_void, [
    rocksdb_writebatch_tPointer,
  ]],
  rocksdb_writebatch_count: [js_int32, [
    rocksdb_writebatch_tPointer,
  ]],
  rocksdb_writebatch_create: [rocksdb_writebatch_tPointer, [
  ]],
  rocksdb_writebatch_create_from: [rocksdb_writebatch_tPointer, [
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_data: [js_CString, [
    rocksdb_writebatch_tPointer,
    size_tPointer,
  ]],
  rocksdb_writebatch_delete: [js_void, [
    rocksdb_writebatch_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_delete_cf: [js_void, [
    rocksdb_writebatch_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_delete_range: [js_void, [
    rocksdb_writebatch_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_delete_range_cf: [js_void, [
    rocksdb_writebatch_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_delete_rangev: [js_void, [
    rocksdb_writebatch_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_delete_rangev_cf: [js_void, [
    rocksdb_writebatch_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_deletev: [js_void, [
    rocksdb_writebatch_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_deletev_cf: [js_void, [
    rocksdb_writebatch_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_destroy: [js_void, [
    rocksdb_writebatch_tPointer,
  ]],
  rocksdb_writebatch_iterate: [js_void, [
    rocksdb_writebatch_tPointer,
    js_voidPointer,
    FunctionProto_0,
    FunctionProto_1,
  ]],
  rocksdb_writebatch_merge: [js_void, [
    rocksdb_writebatch_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_merge_cf: [js_void, [
    rocksdb_writebatch_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_mergev: [js_void, [
    rocksdb_writebatch_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_mergev_cf: [js_void, [
    rocksdb_writebatch_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_pop_save_point: [js_void, [
    rocksdb_writebatch_tPointer,
    js_CString,
  ]],
  rocksdb_writebatch_put: [js_void, [
    rocksdb_writebatch_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_put_cf: [js_void, [
    rocksdb_writebatch_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_put_log_data: [js_void, [
    rocksdb_writebatch_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_putv: [js_void, [
    rocksdb_writebatch_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_putv_cf: [js_void, [
    rocksdb_writebatch_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_rollback_to_save_point: [js_void, [
    rocksdb_writebatch_tPointer,
    js_CString,
  ]],
  rocksdb_writebatch_set_save_point: [js_void, [
    rocksdb_writebatch_tPointer,
  ]],
  rocksdb_writebatch_singledelete: [js_void, [
    rocksdb_writebatch_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_singledelete_cf: [js_void, [
    rocksdb_writebatch_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_clear: [js_void, [
    rocksdb_writebatch_wi_tPointer,
  ]],
  rocksdb_writebatch_wi_count: [js_int32, [
    rocksdb_writebatch_wi_tPointer,
  ]],
  rocksdb_writebatch_wi_create: [rocksdb_writebatch_wi_tPointer, [
    size_t,
    js_uchar,
  ]],
  // rocksdb_writebatch_wi_create_from: [rocksdb_writebatch_wi_tPointer, [
  //   js_CString,
  //   size_t,
  // ]],
  rocksdb_writebatch_wi_create_iterator_with_base: [rocksdb_iterator_tPointer, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_iterator_tPointer,
  ]],
  rocksdb_writebatch_wi_create_iterator_with_base_cf: [rocksdb_iterator_tPointer, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_iterator_tPointer,
    rocksdb_column_family_handle_tPointer,
  ]],
  rocksdb_writebatch_wi_data: [js_CString, [
    rocksdb_writebatch_wi_tPointer,
    size_tPointer,
  ]],
  rocksdb_writebatch_wi_delete: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_delete_cf: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_delete_range: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_delete_range_cf: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_delete_rangev: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_wi_delete_rangev_cf: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_wi_deletev: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_wi_deletev_cf: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_wi_destroy: [js_void, [
    rocksdb_writebatch_wi_tPointer,
  ]],
  rocksdb_writebatch_wi_get_from_batch: [js_CString, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_options_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_writebatch_wi_get_from_batch_and_db: [js_CString, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_writebatch_wi_get_from_batch_and_db_cf: [js_CString, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_tPointer,
    rocksdb_readoptions_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_writebatch_wi_get_from_batch_cf: [js_CString, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_options_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    size_tPointer,
    js_CString,
  ]],
  rocksdb_writebatch_wi_iterate: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_voidPointer,
    FunctionProto_2,
    FunctionProto_3,
  ]],
  rocksdb_writebatch_wi_merge: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_merge_cf: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_mergev: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_wi_mergev_cf: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_wi_put: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_put_cf: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_put_log_data: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_putv: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_wi_putv_cf: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
    js_int32,
    js_CString,
    size_tPointer,
  ]],
  rocksdb_writebatch_wi_rollback_to_save_point: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_CString,
  ]],
  rocksdb_writebatch_wi_set_save_point: [js_void, [
    rocksdb_writebatch_wi_tPointer,
  ]],
  rocksdb_writebatch_wi_singledelete: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writebatch_wi_singledelete_cf: [js_void, [
    rocksdb_writebatch_wi_tPointer,
    rocksdb_column_family_handle_tPointer,
    js_CString,
    size_t,
  ]],
  rocksdb_writeoptions_create: [rocksdb_writeoptions_tPointer, [
  ]],
  rocksdb_writeoptions_destroy: [js_void, [
    rocksdb_writeoptions_tPointer,
  ]],
  rocksdb_writeoptions_disable_WAL: [js_void, [
    rocksdb_writeoptions_tPointer,
    js_int32,
  ]],
  rocksdb_writeoptions_get_disable_WAL: [js_uchar, [
    rocksdb_writeoptions_tPointer,
  ]],
  rocksdb_writeoptions_get_ignore_missing_column_families: [js_uchar, [
    rocksdb_writeoptions_tPointer,
  ]],
  rocksdb_writeoptions_get_low_pri: [js_uchar, [
    rocksdb_writeoptions_tPointer,
  ]],
  rocksdb_writeoptions_get_memtable_insert_hint_per_batch: [js_uchar, [
    rocksdb_writeoptions_tPointer,
  ]],
  rocksdb_writeoptions_get_no_slowdown: [js_uchar, [
    rocksdb_writeoptions_tPointer,
  ]],
  rocksdb_writeoptions_get_sync: [js_uchar, [
    rocksdb_writeoptions_tPointer,
  ]],
  rocksdb_writeoptions_set_ignore_missing_column_families: [js_void, [
    rocksdb_writeoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_writeoptions_set_low_pri: [js_void, [
    rocksdb_writeoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_writeoptions_set_memtable_insert_hint_per_batch: [js_void, [
    rocksdb_writeoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_writeoptions_set_no_slowdown: [js_void, [
    rocksdb_writeoptions_tPointer,
    js_uchar,
  ]],
  rocksdb_writeoptions_set_sync: [js_void, [
    rocksdb_writeoptions_tPointer,
    js_uchar,
  ]],
});

module.exports = {
  constants,
  types,
  functions,
};

