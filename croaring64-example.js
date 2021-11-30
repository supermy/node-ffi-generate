const ffi = require('ffi-napi');
const ref = require("ref-napi");

const RocksDbOptions = ref.types.void;
const RocksDbOptionsPtr = ref.refType(RocksDbOptions);
const RocksDb = ref.types.void;
const RocksDbPtr = ref.refType(RocksDb);

//手动写的接口
const rocksdb_lib = ffi.Library('libroaring', {
    "croaring": [ RocksDbOptionsPtr, [] ]
    // "rocksdb_options_create": [ RocksDbOptionsPtr, [] ],
    // "rocksdb_options_set_create_if_missing": [ref.types.void, [RocksDbOptionsPtr, ref.types.uchar]],
    // "rocksdb_open": [RocksDbPtr, [RocksDbOptionsPtr, 'string', ref.refType('string')]]
});

const err = Buffer.from("");
const opt = rocksdb_lib.croaring().RoaringBitmap32();
opt.add(1);
console.log(opt.cardinality())