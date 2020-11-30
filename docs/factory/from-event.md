<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>fromEvent</h1>
  <br><br>
</div>

Creates a callbag source that emits given DOM events (or NodeJS event emitter).

```ts
function fromEvent(target: EventTarget, name: string): Source<Event>
```

```ts | --term ​
import { fromEvent, subscribe, pipe } from 'callbag-common';

pipe(
  fromEvent(document, 'mousemove'),
  subscribe(event => {
    console.log(event.clientX + ', ' + event.clientY);
  })
);
> 147, 84
> 147, 85
> 148, 86
> 139, 88
> ...
```
> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-from-event

<br>

- [Source](https://github.com/staltz/callbag-from-event)

<br>

---

> :ToCPrevNext