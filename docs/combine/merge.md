<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>merge</h1>
  <br><br>
</div>

Merges data from multiple callbag sources:

```ts
function merge<T>(...sources: Source<T>[]): Source<T>
```
```ts | --term ​
import { interval, pipe, subscribe, merge, map } from 'callbag-common';

pipe(
  merge(
    pipe(interval(500), map(a => 'A = ' + a)),
    pipe(interval(1000), map(b => 'B = ' + b)),
  ),
  subscribe(console.log)
)
> A = 0
> B = 0
> A = 1
> A = 2
> B = 1
> A = 3
> A = 4
> B = 2
> ...
```

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-merge

<br>

👉 Basically whenever any of the sources emits, the merged source will also emit the same data.

<br>

- [Source](https://github.com/staltz/callbag-merge)

<br>

---

> :ToCPrevNext