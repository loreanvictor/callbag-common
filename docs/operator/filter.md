<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>filter</h1>
  <br><br>
</div>

Only allows values who satisfy given condition:

```ts
function filter<T>(f: (t: T) => boolean): (src: Source<T>) => Source<T>
```
```ts | --term ​
import { interval, filter, subscribe, pipe } from 'callbag-common';

pipe(
  interval(1000),
  filter(x => x % 3 === 1),
  subscribe(console.log),
)
> 1
> 4
> 7
> 10
> ...
```

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-filter

<br>

- [Source](https://github.com/staltz/callbag-filter)

<br>

---

> :ToCPrevNext