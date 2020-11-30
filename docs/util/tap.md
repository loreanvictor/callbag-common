<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>tap</h1>
  <br><br>
</div>

Read passing data without changing it:

```ts
function tap<T>(do: (t: T) => void): (src: Source<T>) => Source<T>
```
```ts | --term ​
import { tap, interval, map, subscribe, pipe, filter } from 'callbag-common';

pipe(
  interval(1000),
  tap(v => console.log('Before: ' + v)),
  map(x => x * 3),
  filter(x => x % 2 === 0),
  subscribe(v => console.log('After: ' + v))
)

> Before: 0
> After: 0
> Before: 1
> Before: 2
> After: 6
> Before: 3
> Before: 4
> After: 12
> ...
```

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-subscribe

<br>

👉 `tap()` is useful for debugging as well as side-effects.

<br>

- [Source](https://github.com/loreanvictor/callbag-common/blob/main/src/tap.ts)

<br>

---

> :ToCPrevNext