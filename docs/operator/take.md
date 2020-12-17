<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>take</h1>
  <br><br>
</div>

Take a maximum number of values from source:

```ts
function take<I>(n: number): (src: Source<I>) => Source<I>
```
```ts | --term ​
import { interval, take, subscribe, pipe } from 'callbag-common';

pipe(
  interval(1000),
  take(3),
  subscribe(console.log),
)
> 0
> 1
> 2
```

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-take

<br>

---

<br>

👉 `take()` will _unsubscribe_ from its source after it has read its values,
so using `take(1)` is a safe way of reading the next value of the source:

```ts | --term
import { pipe, take, subscribe } from 'callbag-common';

export function logNext(cb) {
  pipe(
    cb,
    take(1),
    subscribe(console.log)      // --> you don't need to unsubscribe
  )
}
```

<br>

- [Source](https://github.com/staltz/callbag-take/)

<br>

---

> :ToCPrevNext