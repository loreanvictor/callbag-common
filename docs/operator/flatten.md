<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>flatten</h1>
  <br><br>
</div>

Flattens a higher-order callbag into a lower-order callbag:

```ts
function flatten<T>(src: Source<Source<T>>): Source<T>
```
```ts
import {
  fromEvent, map, interval, flatten, subscribe, pipe
} from 'callbag-common';

const button = document.querySelector('button');
const span = document.querySelector('span');

pipe(
  fromEvent(button, 'click'),
  map(() => interval(100)),               // --> map each click to a new interval (higher-order callbag)
  flatten,                                // --> flatten the higher-order callbag
  map(i => i / 10),
  subscribe(i => span.textContent = i)
)
```
<iframe src="https://callbag-flatten.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-flatten

<br>

> ☝️ In this example, we turn each click into a new interval. So we start with a callbag of click events,
> then transform it into a callbag of intervals. Since each interval is a callbag itself, we basically
> have a callbag of callbags, which is a higher-order callbag.

`flatten()` subscribes to the latest callbag emitted from the source. When a new callbag is emitted,
it will cancel the subscription to the previous one and subscribe to the new one.

<br>

---

<br>

👉 A commonly used higher-order callbag pattern is mapping user input to requests (which are callbags themselves).
It is common to use `flatten()` in this pattern:

```ts
import {
  fromPromise, fromEvent, flatten, subscribe, pipe, map,
} from 'callbag-common';

const input = document.querySelector('input');
const button = document.querySelector('button');
const span = document.querySelector('span');

const getRepo = async (repo) => {
  try {
    const res = await fetch('https://api.github.com/repos/' + repo);
    return await res.json();
  } catch {}
}

pipe(
  fromEvent(button, 'click'),
  map(() => fromPromise(getRepo(input.value))),
  flatten,
  map(repo => repo?.stargazers_count || '??'),
  subscribe(count => span.textContent = count)
);
```
> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-github-stars-recipe

<br>

- [Source](https://github.com/staltz/callbag-flatten)

<br>

---

> :ToCPrevNext