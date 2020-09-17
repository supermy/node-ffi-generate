<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

# [Forked version of `node-ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) libclang example

This example shows how to generate bindings for the [`libclang`](https://clang.llvm.org/) [Indexing Public C Interface](https://clang.llvm.org/doxygen/Index_8h_source.html).

- Generates bindings and writes them to `dynamic-clang.js`.
- After generation, the generated bindings are executed using `require()`.
  - The bindings load `libclang`.
  - Some basic `libclang` functions are called, to output the `libclang` version to `stdout`.
  - Example output: `clang version 9.0.1-12`

```shell
# NOTE: setting LD_LIBRARY_PATH might be required to find libclang.
# NOTE: setting C_INCLUDE_PATH externally for convenience, since the header file location can vary by system and version.
LD_LIBRARY_PATH="$(llvm-config --libdir)" C_INCLUDE_PATH="$(llvm-config --includedir)" node example.js
```

## CLI version

Running with additional flags, so it is probably giving a different output.

```shell
ffi-generate --prefix 'clang' --prefix 'CX' --file "$(llvm-config --includedir)/clang-c/Index.h" --library 'libclang' -- $(llvm-config --cflags) > 'dynamic-clang.js'
```

---

`node-ffi-generate` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), 2020 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
