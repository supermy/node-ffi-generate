const ffi = require('ffi-napi');
const ref = require("ref-napi");

const RocksDbOptions = ref.types.void;
const RocksDbOptionsPtr = ref.refType(RocksDbOptions);
const RocksDb = ref.types.void;
const RocksDbPtr = ref.refType(RocksDb);

//手动写的接口
const rocksdb_lib = ffi.Library('librocksdb', {
    "rocksdb_options_create": [ RocksDbOptionsPtr, [] ],
    "rocksdb_options_set_create_if_missing": [ref.types.void, [RocksDbOptionsPtr, ref.types.uchar]],
    "rocksdb_open": [RocksDbPtr, [RocksDbOptionsPtr, 'string', ref.refType('string')]]
});

const err = Buffer.from("");
const opt = rocksdb_lib.rocksdb_options_create();
rocksdb_lib.rocksdb_options_set_create_if_missing(opt, 1);
const db = rocksdb_lib.rocksdb_open(opt, "./db/test14.db", err);

// 动态生成的ffi 接口
const {
	functions,
} = require("./dynamic-rocksdb");

const opt1 = functions.rocksdb_options_create();
functions.rocksdb_options_set_create_if_missing(opt1, 1);
const db1 = functions.rocksdb_open(opt, "./db/dynamic.db", err);






