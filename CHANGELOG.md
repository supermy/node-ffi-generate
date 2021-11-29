<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

<p align="center">
  <a href="https://github.com/node-ffi-packager/node-ffi-generate">README</a> &middot; <a href="./CHANGELOG.md">Changelog</a> &middot; <a href="./DEVELOP.md">Development</a>
</p>

# [Forked version of `node-ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) changelog

Change summaries and notable excerpts from the commit log.

## 20211129
  
  整理：

      ffi-generate --file '/usr/include/ImageMagick/wand/MagickWand.h' --library 'libMagickWand' --prefix 'Magick' -- $(Magick-config --cflags)

      生成 FFI-clang
      node bin/ffi-generate.js --prefix 'clang' --prefix 'CX' --file "$(llvm-config --includedir)/clang-c/Index.h" --library 'libclang' -- $(llvm-config --cflags) 



      与 emcc 环境冲突，可先在 bash_profile 中注销 emcc 的环境
      npm 切换版本: n 12.22.6
          列出版本: n ls
          列出所有可用版本： n  ls-remote

      生成 FFI-RocksDb
      node bin/ffi-generate.js --file "/usr/local//Cellar/rocksdb/6.20.3/include/rocksdb/c.h" --library 'librocksdb' -- -I/usr/local//Cellar/rocksdb/6.20.3/include/ -I/usr/local//Cellar/llvm/12.0.0_1/lib/clang/12.0.0/include/>dynamic-rocksdb.js

      有两处需要更改
        <!-- 替换:   types.[  -> types[ -->
        注销：  rocksdb_writebatch_wi_create_from

      生成 FFI-CRoaring
      node bin/ffi-generate.js --file "/usr/local/Cellar/croaring/0.3.2/include/roaring/roaring.h" --library 'librocksdb' -- -I/usr/local/Cellar/croaring/0.3.2/include/ -I/usr/local//Cellar/llvm/12.0.0_1/lib/clang/12.0.0/include/>dynamic-croaring.js


## v2.0.2

- e375b03 Revert to void pointers for recursive type definitions

## v2.0.1

- 2e5beae Do not register type js_voidPointer before js_void

## v2.0.0

### ⚠ Breaking changes

- Target Node.js v12, v14, v16.
  - Execution on v14, v16 may fail with `Check failed: result.second` due to bug [#96 in `ffi-napi`](https://github.com/node-ffi-napi/node-ffi-napi/issues/96).
    - One workaround is to ensure there is only a single copy of `ffi-napi` in the `node_modules` tree.
    - Inspect with `npm ls ffi-napi`.
- The package name is now `@ffi-packager/ffi-generate`.
- Switched to `async`/`await`, in particular for the exported `async generate(...)` function.
- Exports in the generated code have changed.
  - The `CONSTANTS` property was renamed to `constants`.
  - Exported functions under `{{module}}` property (defaulted to the value of `library`) was renamed to `functions`.
  - All exported types were moved from the top-level scope to a `types` property.
- Changed options for `generate(...)` and command line arguments for `ffi-generate`.
  - The `module` (`-m`, `--module`) option was removed.
    - Instead, the hardcoded property name `functions` is used.
    - This breaks previously generated code, which used either the name of the library (default) or a custom module name.
  - The `file_only` (`--file_only`) option was renamed to `singleFile` (`--single-file`).
  - The `strict` flag was removed. It was unused anyhow.
  - The `--libclang` argument was removed.
    - It should be autodetected by `ffi-generate` by calling the `llvm-config` tool (make sure it's on your `PATH`).
    - Can also be set using the `LD_LIBRARY_PATH` (or `DYLD_LIBRARY_PATH` on macOS) environment variable.
  - The `filename` option was renamed to `filepath`.
- Enum numbers larger than the largest "safe" max/min integer number handleable by javascript are output as strings.
  - Note that the determined "safe" range differs between [`ffi-napi`'s min/max](https://github.com/node-ffi-napi/ref-napi/blob/b0809c25e5d9e4efa82ee6c323e1f961044b65e0/src/binding.cc#L66-L70) and [javascript's `Number.*_SAFE_INTEGER`](https://tc39.es/ecma262/2020/#sec-number.max_safe_integer) with a [difference of +/- 1](https://stackoverflow.com/questions/26380364/why-is-number-max-safe-integer-9-007-199-254-740-991-and-not-9-007-199-254-740-9).
- Generated `typedef` output was simplified to be a javascript alias/variable reassignment.
- The `union` support was fixed.
  - Now `union` is handled in a similar way to `struct`.
  - Output may differ from v1.0.0.
- Naming changes.
  - Naming of anonymous types, functions, and properties changed.
  - Base types and typedefs are recursed, with intermediate types output and aliased.
  - "Javascript types" from `ref-napi` are now (directly) referenced only once, in variables prefixed with `js_`.
- See also changes in the expected test output in `test/` files.

### Features

- Output enum constants, even if they were not referenced by any function.
- Allow the `library` option to be `null`.
  - This means that no dynamic library is loaded, and instead functions are mapped to what is available in the current process.
  - Allows mapping functions to libraries which have already been loaded, either implicitly by the executing binary (such as `node`) or manually with `FFI.DynamicLibrary(...)`.
- The generated code is partially sorted (constants, types, functions) to help with diffing between versions.
- Added a generated file header with some metadata.
- Improved documentation, example usage.
  - Added [`DEVELOP.md`](./DEVELOP.md).
  - Moved examples to the `examples/` directory.
- Reduced console output for non-debug situations.
  - Debug output can easily be enabled; see [`DEVELOP.md`](./DEVELOP.md).
- Generated code is formatted using [`prettier`](https://prettier.io/).

### Other changes

- Internal code improvements.
  - Code has been reformatted, cleaned up, modernized.
  - Code partially split up to files and functions.
  - Uses `class` statements rather than class-like functions.
- Added tests with a code coverage of 90% for branches, 95%+ for statements and lines, 100% for functions.
  - Reports are generated when running code coverage tests, both on the command line and in the `coverage/` directory.
- Tests, linting, and code coverage are checked with commit hooks.
- Regenerated the `ffi` layer in `node-libclang`.
  - To avoid a circular dependency, the `dynamic-clang.js` file in `node-liblang` is statically included in that package.
  - See [`examples/libclang/`](./examples/libclang/) and [`test/libclang/`](./test/libclang/).
- Workaround for `va_list` was both added and removed, as it is now handled by recursing deeper into base types.

## v1.0.0

Forked by [Joel Purra](https://joelpurra.com/) for use in [node-ffi-packager](https://github.com/node-ffi-packager).

- a2cd667 Add information about the [node-ffi-packager](https://github.com/node-ffi-packager) fork
- 8e3132a Use [node-ffi-packager/node-libclang](https://github.com/node-ffi-packager/node-libclang) fork
- 60418ff Visit only canonical cursors
- bec83f6 Support enum values
- 2969398 Skip inline functions
- bc01b24 Use [ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi), [ref-napi](https://github.com/node-ffi-napi/ref-napi), and [related Node.js NAPI packages](https://github.com/node-ffi-napi)
- 6ffa2c6 Add support for [elaborated type](https://clang.llvm.org/doxygen/classclang_1_1ElaboratedType.html)

## v0.0.8

See commit log.

## v0.0.7

See commit log.

## v0.0.6

See commit log.

## v0.0.4

See commit log.

## v0.0.3

See commit log.

## v0.0.2

See commit log.

## v0.0.1

See commit log.

---

`node-ffi-generate` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), &copy; 2020, 2021 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
