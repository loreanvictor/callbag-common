<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>map</h1>
  <br><br>
</div>

Maps incoming values using given function:

```ts
function map<I, O>(f: (i: I) => O): (src: Source<I>) => Source<O>
```
```ts | --term ​
import { of, map, subscribe, pipe } from 'callbag-common';

pipe(
  of(1, 2, 3, 4),
  map(x => x * 2),
  subscribe(console.log),
)
> 2
> 4
> 6
> 8
```

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-map

<br>

---

<br>

👉 The function passed to `map()` can also return other callbags (which is called a higher-order callbag). When you do that,
use [flatten](/operator/flatten) (or another flattening operator) to turn the higher-order callbag back to normal callbag:

```ts
import {
  fromEvent, map, interval, flatten, subscribe, pipe
} from 'callbag-common';

const button = document.querySelector('button');
const span = document.querySelector('span');

pipe(
  fromEvent(button, 'click'),
  map(() => interval(100)),
  flatten,
  map(i => i / 10),
  subscribe(i => span.textContent = i)
)
```
> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-flatten

<br>

- [Source](https://github.com/staltz/callbag-map/)

<br>

---

> :ToCPrevNext