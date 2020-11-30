<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>callbag-common</h1>
</div>

Commonly used [callbag utilities](https://github.com/callbag/callbag).

```bash
npm i callbag-common
```
👉 [Read the docs](https://loreanvictor.github.io/callbag-common/)

<br>

## Included Utilities

- `pipe()`
- `of()`
- `fromPromise()`
- `fromEvent()`
- `map()`
- `filter()`
- `interval()`
- `merge()`
- `combine()`
- `expr()`
- `flatten()`
- `debounce()`
- `tap()`
- `subscribe()`

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

<br>

👉 **TODO**: complete usage docs with examples for each included module, add recipes for common use cases.
