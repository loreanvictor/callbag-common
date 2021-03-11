<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>scan</h1>
  <br><br>
</div>

Like [`Array.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
but for callbags. You can use it to combine consecutive values:

```ts
function scan<I, O>(
  reducer: (acc: O, each: I) => O,
  seed?: O
): (src: Source<I>) => Source<O>
```
```ts | --term ​
import { of, scan, subscribe, pipe } from 'callbag-common'

pipe(
  of(1, 2, 3, 4),
  scan((fact, i) => fact * i, 1),
  subscribe(console.log)
)
> 1
> 2
> 6
> 24
```
> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/callbag-scan

<br>

---

<br>

👉 `scan()` can be used for handling pagination. Here is an example [React](https://reactjs.org/) app using
[react-callbag-streams](https://github.com/loreanvictor/react-callbag-streams):

```tsx
const [query, setQuery] = useState('')
const [loadMoreSignal, loadMore] = useSignal()

const [entries, loading] = useStream(
  query,                                          // --> for each input query
  filter(q => !!q),                               // --> that is non-empty
  debounce(200),                                  // --> debounce it by 200 ms to avoid spamming the API
  map(q =>
    pipe(
      combine(                                    // --> combine the query with a page number
        of(q),
        pipe(
          loadMoreSignal,                         // --> for each signal for loading more data
/*!*/          scan(p => ++p, 0),                      // --> increase the page number
          startWith(0),                           // --> starting with 0
        ),
      ),
      map(([q, p]) => fromPromise(fetch(q, p))),  // --> fetch data for given query and page number
      flatten,                                    // --> flatten the request
/*!*/      scan((all, page) => [...all, ...page], []), // --> accumulate received entries
    )
  ),
  flatten
)

return (
  <>
    <input onInput={e => setQuery((e.target as any).value)}/>
    { entries.map( entry => <div key={entry}>{entry}</div> }
    <br/>
    <button onClick={() => loadMore()}>Load More</button>
  </>
)
```
<iframe src="https://react-callbag-streams-demo-5.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=► Try It!, url=https://stackblitz.com/edit/react-callbag-streams-demo-5

<br>

---

<br>

👉 `scan()` can also be used for [Redux](https://redux.js.org/)-style state management:

```tsx
const state = pipe(
  dispatch,
  scan(
    (state, action) => {                      // --> this is the reducer
      if (action.type === 'INSERT') {
        state.todos.push(action.todo)
      } else if (action.type === 'CLEAR') {
        state.todos = []
      }

      return state
    },
    { todos: [] }                             // --> this is the initial state
  )
)
```

<br>

- [Source](https://github.com/staltz/callbag-scan/)

<br>

---

> :ToCPrevNext