<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>subscribe</h1>
  <br><br>
</div>

Greets the given source, and starts listening to its values.
```ts
function subscribe<T>(listener: (data: T) => void): () => void
```
```ts
import { interval, map, subscribe, pipe } from 'callbag-common';

const src = pipe(
  interval(1000),
  map(x => x * 3)
);

subscribe(console.log)(src);
```

You can call `subscribe()` at the end of a pipe chain too:

```ts
import { interval, map, subscribe, pipe } from 'callbag-common';

pipe(
  interval(1000),
  map(x => x * 3),
  subscribe(console.log)
);
```

<br>

👉 Before calling `subscribe()`, the source is not greeted and it might not do anything at all.
For example, `interval()` will not start its timer before being greeted (and it will start a new
timer for every new greeter).

👉 `subscribe()` returns a method that you can call to end the subscription (i.e. send an end signal
to the source). This is important as if you don't clean up, resources (like memory) might not get
released properly:

```ts
import { interval, map, subscribe, pipe } from 'callbag-common';

const src = pipe(
  interval(1000),
  map(x => x * 3)
);

const cleanup = subscribe(console.log)(src);

setTimeout(() => cleanup(), 5000);
```

Or using pipe:

```ts | --term ​
import { interval, map, subscribe, pipe } from 'callbag-common';

const cleanup = pipe(
  interval(1000),
  map(x => x * 3),
  subscribe(console.log)
);

setTimeout(() => cleanup(), 5000);

> 0
> 3
> 6
> 9
```

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-subscribe

<br>

- [Source](https://github.com/zebulonj/callbag-subscribe)

<br>

---

> :ToCPrevNext