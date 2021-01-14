<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>source</h1>
  <br><br>
</div>

When passed argument is not a callbag, `source()` turns it into a callbag using [`of()`](/factory/of).
Otherwise it will return the same callbag.

```ts
type MaybeSource<T> = T | Source<T>;
function source<T>(maybe: MaybeSource<T>): Source<T>;
```

```ts | --term ​
import { MaybeSource, source, pipe, map, interval, subscribe } from 'callbag-common'

function multiplyBy2(n: MaybeSource<number>) {
  return pipe(source(n), map(x => x * 2))
}

pipe(
/*!*/  multiplyBy2(42),           // --> can accept numbers
  subscribe(console.log)
)

> 84

pipe(
  interval(1000),
/*!*/  multiplyBy2,               // --> can be piped as it accepts callbags as well
  subscribe(console.log)
)

> 0
> 2
> 4
> 6
> ...
```

<br>

👉 Use `source()` when your functions want to handle arguments that might be a callbag source or might be a plain value.

<br>

- [Source](https://github.com/loreanvictor/callbag-common/blob/main/src/maybe.ts)

<br>

---

> :ToCPrevNext