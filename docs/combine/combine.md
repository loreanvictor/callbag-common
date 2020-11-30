<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>combine</h1>
  <br><br>
</div>

Combines data from multiple sources and emits as an array:

```ts
function combine<A, B>(a: Source<A>, b: Source<B>): Source<[A, B]>
```
```ts | --term ​
import { interval, pipe, subscribe, combine, map } from 'callbag-common';

pipe(
  combine(interval(500), interval(1000)),
  subscribe(console.log)
)
> [0, 0]
> [1, 0]
> [2, 0]
> [2, 1]
> [3, 1]
> [4, 1]
> [4, 2]
> [5, 2]
> [6, 2]
> [6, 3]
> ...
```

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-combine

<br>

👉 Waits until all sources have emitted at least once.

👉 After that, will emit every time any source emits, combining latest emissions into an array.

👉 Can be called with any number of sources.

<br>

- [Source](https://github.com/staltz/callbag-combine)

<br>

---

> :ToCPrevNext