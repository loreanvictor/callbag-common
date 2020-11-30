<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>expr</h1>
  <br><br>
</div>

Calculate expressions with values from multiple callbag sources:

```ts
function expr<R>(fn: ($: Track) => R): Source<R>
```
```ts
import { fromEvent, pipe, subscribe, expr, map } from 'callbag-common';

const span = document.querySelector('span');
const a = document.querySelector('#a') as HTMLInputElement;
const b = document.querySelector('#b') as HTMLInputElement;

const aVal = pipe(fromEvent(a, 'input'), map(() => parseInt(a.value)));
const bVal = pipe(fromEvent(b, 'input'), map(() => parseInt(b.value)));

pipe(
  expr($ => $(aVal) + $(bVal)),
  subscribe(v => span.textContent = v)
)
```
<iframe src="https://callbag-expr-simple.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-expr-simple

```ts
import { interval, pipe, subscribe, expr } from 'callbag-common';

const span = document.querySelector('span');

const a = interval(50);
const b = interval(200);
const c = interval(3000);

pipe(
  expr($ => {
    if ($(c) % 2 === 0) return 'A = ' + $(a);
    else return 'B = ' + $(b);
  }),
  subscribe(v => span.textContent = v)
)
```
<iframe src="https://callbag-expr.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-expr

<br>

---

👉 A key point in using `expr()` is that you SHOULD NOT create new callbag sources
in the function you give it. So this is wrong:
```ts
/*~*/expr($ => $(interval(1000)) * 2);/*~*/
```
And this is the correct version:
```ts
const i = interval(1000);
expr($ => $(i) * 2);
```

<br>

- [Source](https://github.com/loreanvictor/callbag-expr)

<br>

---

> :ToCPrevNext