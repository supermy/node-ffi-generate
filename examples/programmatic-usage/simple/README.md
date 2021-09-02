<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

# [Forked version of `node-ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) simple example

This example shows how to programmatically generate bindings for a simple header file, and print it to `stdout`.

- The generated bindings won't actually load, since the code in `mylibrary.c` is not compiled (nor complete).
- The custom example type `myobj` is reported missing, since it is (for the sake of the example) not defined.
- It would be easier to use the `ffi-generate` command line interface (CLI) tool instead.

```shell
cnpm i engine-check --save
cnpm i prettier --save
cnpm i debug --save
cnpm i execa --save
cnpm i hasha --save
cnpm i semver --save
npm install --save github:node-ffi-packager/node-libclang#semver:^v2.0.2

# NOTE: setting LD_LIBRARY_PATH might be required to find libclang.
LD_LIBRARY_PATH="$(llvm-config --libdir)" node example.js
LD_LIBRARY_PATH="$(llvm-config --libdir)" node ./examples/programmatic-usage/simple/example.js 

```
## Result javascript

```


```
## CLI version

```shell
ffi-generate --file 'mylibrary.h' --library 'mylibrary'
```


---

`node-ffi-generate` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), &copy; 2020, 2021 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
