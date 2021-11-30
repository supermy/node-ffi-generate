const ffi = require('ffi-napi');
const ref = require("ref-napi");

// 动态生成的ffi 接口
const {
	functions,
} = require("./dynamic-croaring");

const bitmap1 = functions.roaring_bitmap_create_with_capacity(0);
// functions.roaring_bitmap_add(bitmap1,[100,1000])
for (let index = 0; index < 10000; index++) {
	functions.roaring_bitmap_add(bitmap1,index)
}
console.log('bitmap1.toArray():', functions.roaring_bitmap_get_cardinality(bitmap1))
functions.roaring_bitmap_free(bitmap1)







