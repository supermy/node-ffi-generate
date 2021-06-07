<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

# [Forked version of `node-ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) libclang test

- Uses `ffi-generate` to parse and generate javascript for the [`libclang` v9.0.1](https://releases.llvm.org/download.html#9.0.1) header files.
- Instead of relying on the header files as installed on the current system, since the default path and version might differ, they are included in [`includes/`](./includes/) directory.
- This larger example uses previously generated output to verify the output.
  - It is used to record the status quo of the generator, while smaller unit tests are supposed to catch bugs.
  - [`libclang.js.expected.js`](./libclang.js.expected.js) _should_ be verified for correctness before being committed. Checking the diff is usually enough.
- The output can be used as the base for [`node-libclang`](https://github.com/node-ffi-packager/node-libclang).

---

`node-ffi-generate` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), &copy; 2020, 2021 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
