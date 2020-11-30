<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>pipe</h1>
  <br><br>
</div>

`pipe()` is a utility for chaining transformations together. It actually has nothing to do
with callbags specifically, its just particularly useful with callbag utilities.

```ts
function pipe<A, B, C>(
  a: A,
  b: (a: A) => B,
  c: (b: B) => C
): C
```

<br>

This code:
```ts
import { pipe, interval, map, filter, subscribe } from 'callbag-common';

pipe(
  interval(1000),
  map(x => x * 3),
  filter(x => x % 2 === 0),
  subscribe(console.log)
)
```

<br>

Is equivalent to this code:
```ts
import { interval, map, filter, subscribe } from 'callbag-common';

let source = interval(1000);
source = map(x => x * 3)(source);
source = filter(x => x % 2 === 0)(source);
subscribe(console.log)(source);
```
<br>

In other words:
```ts
pipe(a, b, c, d) === d(c(b(a)))
```

<br>

---

<br>

👉 You can also use `pipe()` to easily build new utilities and operators:

```ts | --term ​
const multiply = k => src => pipe(src, map(n => n * k));

pipe(
  interval(1000),
  multiply(10),
  subscribe(console.log)
)

> 0
> 10
> 20
> 30
> ...
```

<br>

- [Source](https://github.com/staltz/callbag-pipe)

<br>

---

> :ToCPrevNext