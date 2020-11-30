<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>interval</h1>
  <br><br>
</div>

Creates a callbag source that emits an increasing number at given interval.

```ts
function interval(period: number): Source<number>
```
```ts
import { interval, subscribe, pipe } from 'callbag-common';

const span = document.querySelector('span');
pipe(
  interval(1000),
  subscribe(i => span.textContent = `You've been here ${i} seconds.`)
)
```
> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-interval

<br>

- [Source](https://github.com/staltz/callbag-interval)

<br>

---

> :ToCPrevNext