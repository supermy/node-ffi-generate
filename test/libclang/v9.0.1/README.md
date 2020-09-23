<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

# [Forked version of `node-ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) libclang test

- Uses `ffi-generate` to parse and generate javascript for the [`libclang` v9.0.1](https://releases.llvm.org/download.html#9.0.1) header files.
- Instead of relying on the header files as installed on the current system, since the default path and version might differ, they are included in [`includes/`](./includes/) directory.
- This larger example uses previously generated output to verify the output.
  - [`libclang.js.expected.js`](./libclang.js.expected.js) needs to be verified for correctness before being committed.
  - Checking the diff is usually enough.

---

`node-ffi-generate` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), 2020 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
