<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>fromPromise</h1>
  <br><br>
</div>

Converts a promise to a callbag source.
```ts
function fromPromise<T>(promise: Promise<T>): Source<T>
```
```ts | --term ​
import { fromPromise, subscribe, pipe } from 'callbag-common';

pipe(
  fromPromise(
    fetch('https://api.github.com/repos/loreanvictor/callbag-common')
    .then(res => res.json())
  ),
  subscribe(repo => {
    console.log(repo.stargazers_count);
  })
);
> 5
```

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-from-promise

<br>

👉 `fromPromise()` is typically used alongside [flatten](/operator/flatten) for turning
user input into requests:

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

- [Source](https://github.com/staltz/callbag-from-promise)

<br>

---

> :ToCPrevNext