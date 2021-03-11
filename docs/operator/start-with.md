<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>startWith</h1>
  <br><br>
</div>

First emit given values to sinks.

```ts
function startWith<A, T>(...initial: A[]): (src: Source<T>) => Source<A | T>
```
```ts | --term ​
import { interval, startWith, map, take, subscribe, pipe } from 'callbag-common';

pipe(
  interval(1000),
  map(i => 3 - i),
  take(3),
  startWith('Ready?'),
  subscribe(console.log),
)
> Ready?
> 3
> 2
> 1
```
> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-start-with

<br>

---

<br>

👉 `startWith()` is useful for pre-populating streams that depend on some external event
for their emissions. For example, your stream might be dependent on user clicking a button,
but you would want it to have some initial value:

```ts
pipe(
  fromEvent(btn, 'click'),
  scan(c => ++c, 0),
/*!*/  startWith(0),                                 // --> without this, the message will only be displayed after first click
  subscribe(c =>
    res.textContent = `You have clicked ${c} times!`
  )
)
```
<iframe src="https://callbag-start-with-2.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-start-with-2

<br>

- [Source](https://github.com/loreanvictor/callbag-common/blob/main/src/start-with.ts)

<br>

---

> :ToCPrevNext