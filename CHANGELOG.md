<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

<p align="center">
  <a href="https://github.com/node-ffi-packager/node-ffi-generate">README</a> &middot; <a href="./CHANGELOG.md">Changelog</a> &middot; <a href="./DEVELOP.md">Development</a>
</p>

# [Forked version of `node-ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) changelog

Change summaries and notable excerpts from the commit log.

## v2.0.0

### ⚠ Breaking changes

- The package name is now `@ffi-packager/ffi-generate`.
- Switched to `async`/`await`, in particular for the exported `async generate(...)` function.
- Exports in the generated code have changed.
  - The `CONSTANTS` property was renamed to `constants`.
  - Exported functions under `{{module}}` property (defaulted to the value of `library`) was renamed to `functions`.
  - All types were moved from the top-level scope to a `types` property.
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

### Features

- Output enum constants, even if they were not referenced by any function.
- Allow the `library` option to be `null`.
  - This means that no dynamic library is loaded, and instead functions are mapped to what is available in the current process.
  - Allows mapping functions to libraries which have already been loaded, either implicitly by the executing binary (such as `node`) or manually with `FFI.DynamicLibrary(...)`.
- The generated code is partially sorted (constants, types, functions) to help with diffing between versions.
- Added a generated file header with some metadata.
- Improved documentation, example usage.
- Generated code is formatted using [`prettier`](https://prettier.io/).
- Output warnings for unmapped types.
  - While it might be the case, it does not necessarily mean that the output is incorrect.
  - It is also likely the generator performs some type unnecessary type mapping, performs checks in the wrong order, or has some hack to take care of it some other way.
  - If there are discrepancies between the header file and the generated javascript, please report the issue and possibly try to investigate/fix it.
- Internal code has been reformatted, cleaned up, partially split up to files and functions.

### Changes

- TODO

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

`node-ffi-generate` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), 2020 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
