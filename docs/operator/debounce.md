<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>debounce</h1>
  <br><br>
</div>

Holds incoming values, and emits last one when no new values arrive for given duration.

```ts
function debounce<T>(duration: number): (src: Source<T>) => Source<T>
```
```ts
import { debounce, pipe, subscribe, fromEvent } from 'callbag-common';

const btn = document.querySelector('button');
const span = document.querySelector('span');

pipe(
  fromEvent(btn, 'click'),
  debounce(1000),
  subscribe(() => span.textContent = 'Got tired?')
)
```
<iframe src="https://callbag-debounce.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-debounce

<br>

---

<br>

👉 `debounce()` is particularly useful for when you want to turn live user input
into requests, but don't want to overwhelm the API as well:

```ts
import {
  fromPromise, fromEvent, flatten, subscribe, pipe, map, debounce,
} from 'callbag-common';

const input = document.querySelector('input');
const span = document.querySelector('span');

const getRepo = async (repo) => {
  try {
    const res = await fetch('https://api.github.com/repos/' + repo);
    return await res.json();
  } catch {}
}

pipe(
  fromEvent(input, 'input'),
  debounce(500),
  map(() => fromPromise(getRepo(input.value))),
  flatten,
  map(repo => repo?.stargazers_count || '??'),
  subscribe(count => span.textContent = count)
);
```
> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-github-stars-live-recipe

<br>

- [Source](https://github.com/atomrc/callbag-debounce)

<br>

---

> :ToCPrevNext