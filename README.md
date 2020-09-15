<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

<p align="center">
  <a href="https://github.com/node-ffi-packager/node-ffi-generate">README</a> &middot; <a href="./CHANGELOG.md">Changelog</a>
</p>

# [Forked version of `node-ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate)

- Used by [node-ffi-packager](https://github.com/node-ffi-packager) to generate [node-ffi-libraries](https://github.com/node-ffi-libraries).
- Depends on a similarly forked [node-libclang](https://github.com/node-ffi-packager/node-libclang).
- Use this version by [referencing the repository/branch in `package.json`](https://docs.npmjs.com/configuring-npm/package-json.html#github-urls) instead of the [official version published on npm](https://www.npmjs.com/package/ffi-generate).
- Based on [`node-ffi-generate`](https://github.com/tjfontaine/node-ffi-generate) ([5ad34dc](https://github.com/tjfontaine/node-ffi-generate/commit/5ad34dc69befbd59601c507c90571b1662e0e66d), [v0.0.8](https://github.com/tjfontaine/node-ffi-generate/releases/tag/v0.0.8)) by [Timothy J Fontaine](https://github.com/tjfontaine).

---

# node-ffi-generate

A tool to generate [Node.js](https://nodejs.org/en/) [Foreign Function Interface (FFI)](https://en.wikipedia.org/wiki/Foreign_function_interface) bindings for a given C/C++ header file. Based on [node-libclang](https://github.com/node-ffi-packager/node-libclang).

## Installation

For command line usage.

```shell
# NOTE: global installation is not necessary, but convenient for command line usage.
npm install --global github:node-ffi-packager/node-ffi-generate#semver:^v1.0.0
```

For programmatic usage.

```shell
npm install --save github:node-ffi-packager/node-ffi-generate#semver:^v1.0.0
```

## CLI usage

Parse the given header file and print the rendered javascript to standard. Fast and simple to use.

```shell
ffi-generate --file '/path/to/myLibrary/header.h' --library 'libmyLibrary'
```

### Usage

```text
Generate node-ffi-napi javascript bindings for a given C/C++ header file

Options:
  -f, --file         The header file to parse                                                              [required]
  -l, --library      The name of the library to dlopen                                                     [required]
  -x, --single-file  Only export functions found in this file
  -p, --prefix       Only import functions whose name start with prefix. Can be specified multiple times.
```

### Extra `libclang` arguments

It may be necessary to pass additional flags/arguments to libclang so it can better parse the header (for example include paths). To pass options directly to libclang use `--` so ffi-generate knows to stop parsing arguments. The rest will be passed to libclang without modification.

```shell
ffi-generate --file '/usr/include/ImageMagick/wand/MagickWand.h' --library 'libMagickWand' --prefix 'Magick' -- $(Magick-config --cflags)
```

### Location of `libclang`

Setting `LD_LIBRARY_PATH` (or perhaps `DYLD_LIBRARY_PATH`) might be necessary for `ffi-generate` to find `libclang`.

```shell
LD_LIBRARY_PATH="$(llvm-config --libdir)" node ./bin/ffi-generate.js --file "$(llvm-config --includedir)/clang-c/Index.h" --library "libclang"
```

## Programmatic usage

- See [`lib/generateffi.js`](./lib/generateffi.js) for options to pass.
- See [`examples/`](./examples/).

---

`node-ffi-generate` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), 2020 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
