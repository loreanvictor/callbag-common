<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>callbag-common</h1>
  <br><br>
</div>

A collection of commonly used utilities for creating / working with reactive streams or iterables.
Included utilities follow with the [callbag specification](https://github.com/callbag/callbag).
```bash
npm i callbag-common
```

<br>

👉 If you do not know what reactive streams or what callbags are, [read this post first](./what-are-callbags).

<br>

---

<br>

## Example Usage

Create a source using a [source factory](#source-factories):

```ts
import { interval } from 'callbag-common';

const source = interval(1000) // --> emit every second
```

<br>

Transform your sources by [piping](/util/pipe) them into some [operators](#operators):
```ts
import { pipe, interval, map, filter } from 'callbag-common';

const source = interval(1000) // --> emit every second
pipe(
  source,
  map(x => x * 3),            // --> multipy by 3
  filter(x => x % 2),         // --> only allow odd numbers
)
```

<br>

[Subscribe](/util/subscribe) to your transformed source:
```ts | --term ​
import { interval, pipe, map, filter, subscribe } from 'callbag-common'

const source = interval(1000) // --> emits every second
pipe(
  source,
  map(x => x * 3),            // --> multiply by 3
  filter(x => x % 2),         // --> only allow odd numbers
  subscribe(console.log)      // --> log any incoming number
)

> 3
> 9
> 15
> 21
> 27
```

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-common

<br>

---

<br>

## Included Utilities

### Source Factories

- [of](/factory/of): Convert static value(s) to a callbag.
- [fromEvent](/factory/from-event): Listen to DOM event.
- [fromPromise](/factory/from-promise): Converts a promise to a callbag.
- [interval](/factory/interval): Emits an increasing number at given intervals.

### Operators

- [map](/operator/map): Transforms incoming values.
- [filter](/operator/filter): Filters incoming values.
- [flatten](/operator/flatten): Flattens higher-order callbags.
- [debounce](/operator/debounce): Debounces incoming values.

### Comination

- [expr](/combine/expr): Create expressions from other callbags.
- [merge](/combine/merge): Merges given callbags, emitting when each one emits.
- [combine](/combine/combine): Combines given callbags, emits arrays of latest values of each.

### Utilities

- [pipe](/util/pipe): Pipes sources to operators to sinks.
- [subscribe](/util/subscribe): Subscribes to given callbag.
- [tap](/util/tap): Taps into given callbag (without subscribing).

<br>

---

<br>

## Why Callbags?

- They are [pretty fast](https://github.com/staltz/callbag-basics/tree/master/perf)
- They are light-weight (this library is [~1.8kB total](https://bundlephobia.com/result?p=callbag-common@0.1.0))
- They are simple and predictable
- They work seamlessly for iterable programming

👉 [Read more](https://staltz.com/why-we-need-callbags.html)

<br>

---

<br>

## Why a Collection?

A key aspect of callbag spec is its simplicity, which makes tools and utilities built around it
[pretty simple as well](https://github.com/callbag/callbag/blob/master/getting-started.md), leading
to a an iterative and high-quality decentralized eco-system of community-maintained tools.

The down-side of such an eco-system is that discovering and using necessary libraries becomes more difficult. The
[callbag wiki](https://github.com/callbag/callbag/wiki) acts as a good reference, but
it can be daunting for new-comers to go through it and find what they need. Besides, importing from
multiple libraries becomes more inconvenient, specifically with incosistent export conventions:

```ts
import pipe from 'callbag-pipe'
import subscribe from 'callbag-subscribe';
import map from 'callbag-map';
import filter from 'callbag-filter';
import flatten from 'callbag-flatten';
import { debounce } from 'callbag-debounce';
import { expr } from 'callbag-expr';
```

<br>

A collection solves these issues, as discovery of basic utilities (or utilities for a specific
purpose) is already done by collection maintainers and imports become much easier as well:

```ts
import { pipe, subscribe, map, filter, flatten } from 'callbag-common';
```

<br>

---

<br>

## Why this Collection?

A strict collection can only be as agile as its least agile module.
callbag-common, on the other hand:

- Provides external libraries, whenever possible.
- Provides internal stand-ins, whenever external counterparts are slow to catch up on their issues.

Additionally, it specifically targets TypeScript / ES6, and only includes callbags that are
commonly used in real-life projects. This means while it gets all the benefits of a decentralized eco-system,
it also always guarantees functionality and type safety.

<br>

---

> :ToCPrevNext