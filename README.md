<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>callbag-common</h1>
  
  [![tests](https://img.shields.io/github/workflow/status/loreanvictor/callbag-common/Test?label=tests&logo=mocha&logoColor=green&style=flat-square)](https://github.com/loreanvictor/callbag-common/actions?query=workflow%3A%22Test%22)
[![version](https://img.shields.io/npm/v/callbag-common?logo=npm&style=flat-square)](https://www.npmjs.com/package/callbag-common)
[![docs](https://img.shields.io/badge/%20-docs-blue?logo=read%20the%20docs&logoColor=white&style=flat-square)](https://loreanvictor.github.io/callbag-common/)
</div>

A collection of commonly used utilities for creating / working with reactive streams or iterables.
Included utilities follow the [callbag specification](https://github.com/callbag/callbag).
```bash
npm i callbag-common
```

👉 [Read the docs](https://loreanvictor.github.io/callbag-common/)

👉 If you do not know what reactive streams or callbags are,
  [read this post first](https://loreanvictor.github.io/callbag-common/what-are-callbags).

<br>

## Included Utilities

### Source Factories

- [of](https://loreanvictor.github.io/callbag-common/factory/of): Convert static value(s) to a callbag.
- [fromEvent](https://loreanvictor.github.io/callbag-common/factory/from-event): Listen to DOM event.
- [fromPromise](https://loreanvictor.github.io/callbag-common/factory/from-promise): Converts a promise to a callbag.
- [interval](https://loreanvictor.github.io/callbag-common/factory/interval): Emits an increasing number at given intervals.

### Operators

- [map](https://loreanvictor.github.io/callbag-common/operator/map): Transforms incoming values.
- [filter](https://loreanvictor.github.io/callbag-common/operator/filter): Filters incoming values.
- [take](https://loreanvictor.github.io/callbag-common/operator/take): Take a maximum number of values from source.
- [startWith](https://loreanvictor.github.io/callbag-common/operator/start-with): Start with given values.

&nbsp;

- [scan](https://loreanvictor.github.io/callbag-common/operator/scan): Combine consecutive values from source.
- [flatten](https://loreanvictor.github.io/callbag-common/operator/flatten): Flattens higher-order callbags.
- [debounce](https://loreanvictor.github.io/callbag-common/operator/debounce): Debounces incoming values.


### Comination

- [expr](https://loreanvictor.github.io/callbag-common/combine/expr): Create expressions from other callbags.
- [merge](https://loreanvictor.github.io/callbag-common/combine/merge): Merges given callbags, emitting when each one emits.
- [combine](https://loreanvictor.github.io/callbag-common/combine/combine): Combines given callbags, emits arrays of latest values of each.

### Utilities

- [pipe](https://loreanvictor.github.io/callbag-common/util/pipe): Pipes sources to operators to sinks.
- [subscribe](https://loreanvictor.github.io/callbag-common/util/subscribe): Subscribes to given callbag.
- [tap](https://loreanvictor.github.io/callbag-common/util/tap): Taps into given callbag (without subscribing).
- [source](https://loreanvictor.github.io/callbag-common/util/source): Converts non-callbags to callbag sources.

<br>

<br>

## Why?

[callbag-basics](https://github.com/staltz/callbag-basics) is maintained _relatively_ slowly, specifically due to the fragmantation
of both utilities included and export targets (for example `tap()` is missing since it lacks types, or examples 
on the README are not working due to environment differences).

In callbag-commons, on the other hand:

- Callbags are picked based on active usage in real-life projects.
- Specifically targeting TypeScript / ES6 (no pre-bundled version as that means no tree-shaking).
- External libraries used, whenever possible.
- Internal alternatives used, whenever external library not possible.

So ideally, in the long run, this should be not _much_ different from callbag-basics. It will basically be
_eventually decentralized_ and _always available_ (everything working in target environments properly).


