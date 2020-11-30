<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>of</h1>
  <br><br>
</div>

Creates a callbag source that emits given values immediately.

```ts
function of<T>(...args: T[]): Source<T>
```

```ts | --term ​
import { of, subscribe, pipe } from 'callbag-common';

const source = of(1, 2, 3, 4);
pipe(source, subscribe(console.log));
> 1
> 2
> 3
> 4
```
> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-of

<br>

👉 `of()` is mostly used for converting static values to callbag sources:

```ts
// --> this function expects a callbag as its argument
export function myFunc(callbagArg: Callbag<any, any>) {
  ...
}
```
```ts
import { of } from 'callbag-common';

myFunc(of(42));  // --> run the function with a static value by converting it
```

<br>

- [Source](https://github.com/Andarist/callbag-of)

<br>

---

> :ToCPrevNext