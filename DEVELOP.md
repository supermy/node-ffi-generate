<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

<p align="center">
  <a href="https://github.com/node-ffi-packager/node-ffi-generate">README</a> &middot; <a href="./CHANGELOG.md">Changelog</a> &middot; <a href="./DEVELOP.md">Development</a>
</p>

# [Forked version of `node-ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) development

## Setup

Follow [git-flow](https://danielkummer.github.io/git-flow-cheatsheet/) and use [git-flow-avh](https://github.com/petervanderdoes/gitflow-avh).

```shell
git flow init -d
```

## Testing

- Executing commands requires the path to `libclang.so` (or similar name on other systems) to be set, so the [dynamic linker](https://en.wikipedia.org/wiki/Dynamic_linker) (used via [`ffi-napi`](https://github.com/node-ffi-napi/ref-napi)) can find it.
  - Setting [`LD_LIBRARY_PATH`](https://en.wikipedia.org/wiki/Environment_variable#$LD_LIBRARY_PATH) (or `DYLD_LIBRARY_PATH` on macOS) is required to load the `ffi-generate` _library_ (from [`index.js`](./index.js)).
  - The `ffi-generate` _executable_ (in [`bin/ffi-generate.js`](./bin/ffi-generate.js)) sets the environment variable automatically.

You can set the path manually, per command. It gets tedious.

```shell
# NOTE: tests load libclang.so.
LD_LIBRARY_PATH="$(llvm-config --libdir)" npm run --silent test

# NOTE: runs tests because of the git precommit-hook.
LD_LIBRARY_PATH="$(llvm-config --libdir)" git commit
```

During development and testing, the environment variable can be set temporarily.

```shell
# NOTE: exporting for temporary use during development.
export LD_LIBRARY_PATH="$(llvm-config --libdir)"

npm run --silent test

git commit

# NOTE: when done with development.
unset LD_LIBRARY_PATH
```

---

`node-ffi-generate` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), 2020 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
