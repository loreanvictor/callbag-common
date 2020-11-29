# What Are Callbags?


Take this code:

```ts
console.log(funcA(...));
console.log(funcB(...));
```

What happens here? First `funcA()` is called and the result it produces is logged, then
`funcB()` is called and the result it produces is logged.

<br>

What if `funcA()` takes a long time to produce its result? Well instead of waiting
for `funcA()` to finish and then calling `funcB()`, we could tell `funcA()` to take as
long as it takes, but _call us back_ when it has produced its result, and tend to `funcB()`
in the meanwhile. I.e.:

```ts
funcA(..., (result) => console.log(result));
console.log(funcB());
```

<br>

Now what if `funcA()` encounters an error while it is trying to produce its result? Well,
the convention is that the _callback_ we provide takes two arguments, and `funcA()` will
send errors on the first and data on the second:

```ts
funcA(..., (err, result) => {
  if (err) { /* --> handle error */ }
  else console.log(result);
});
console.log(funcB());
```

---

## Streams

Now what if `funcA()` produces not one, but multiple results? For example, it might be a function
who is supposed to calculate the position of the mouse cursor on the X-axis, or it might be
the function who calculates the length of some live user input.

> 👉 We call a function that might produce an indeterminate number of _results_, at indeterminate
points in time, a _stream_.

<br>

Well the classic callback spec is too limiting for that purpose, as a stream would need to say a few more
things than just "Here is the data" or "I failed":

>
> 💬 `"I will give you data when I have some. Tell me when you don't want anymore"`.
>
> 💬 `"Here is some more data."`
>
> 💬 `"I am going to stop sending more data because of X."`
>

<br>

With the classic callback spec, you are also more limited in your communication with the function / producer / data-source,
as you can only say "I want data" by calling it. With a stream, however, you would also need more options:

>
> 🗨️ `"Give me data when you got some."`
>
> 🗨️ `"Give me more data."`
>
> 🗨️ `"Stop giving data."`
>

---

## Callbags

We can group different messages that we want to send to / receive from streams like this:


> **GREETING** \
> 🗨️ `"Give me data when you got some."` \
> 💬 `"I will give you data when I have some. Tell me when you don't want anymore"`.

> **DATA** \
> 💬 `"Here is some more data."` \
> 🗨️ `"Give me more data."`

> **END** \
> 💬 `"I am going to stop sending more data because of X."` / \
> 🗨️ `"Stop giving data."`

<br>

Based on this, when we have a source stream, we need to be able to greet it, ask more data from it (perhaps optional
based on what kind of source it is), or end it.
When greeting it, we need to provide it a way to talk back to us, using which it can greet us, give us data,
or tell us when it is going to stop.

We can model either direction of that communication with a function with two arguments:
- One to specify the type of the message (**GREETING**, **DATA**, **END**)
- One to specify the content of the message:
  - A function for talking back, in case of **GREETING**
  - The data being sent by the source, in case of **DATA** (can be empty when requesting data)
  - The reason for termination, in case of **END** (can be empty if no particular reason)

i.e.

```ts
(type: GREET | DATA | END, payload?: any) => void;
```

> 👉 This spec for callbacks is basically called the [callbag specification](https://www.google.com/search?client=safari&rls=en&q=callbag-foreach&ie=UTF-8&oe=UTF-8). In other words, any function like that is a callbag.

<br>

Using this spec, if our `funcA()` is a stream, we provide it with a callbag instead of a classic callback:

```ts
funcA(GREET, (type, payload) => {
  if (type === DATA) console.log(payload);
  else { /* --> funcA() is finished, handle errors if necessary */ }
});
```

> 👉 In the callbag spec, message type is represented by numbers:
> - `0` means **GREET**
> - `1` means **DATA**
> - `2` means **END**
>
> So the actual type definition for a callbag is like this:
> ```ts
> (type: 0 | 1 | 2, payload?: any) => void;
> ```

---

## Talking Back

Now what if we want to only receive 5 data points from `funcA()`, and end it afterwards? Well according to
the spec we outlined, for every greeting message a way for talking back should be provided: another callbag.
We can use that _talkback_ to stop the source after we've got 5 data entries:

```ts
funcA(GREET, (type, payload) => {
  let talkback;
  let N = 0;

  if (type === GREET) talkback = payload; // --> GREET message, payload is a callbag that allows us to talk back to the source
  else if (type === DATA) {
    console.log(payload);
    N++;
    if (N >= 5) talkback(END);            // --> We've got 5 data entries, ask the source to end.
  }
});
```

<br>

> 👉 In the examples so far, we have assumed that the source (`funcA()`) will give us data
> whenever it has some, without us requesting it. Sources like that are called _listenable_.
> If we need to ask a source for more data, i.e. we need to _pull_ data from it, we call
> the source _pullable_.

<br>

Now what if `funcA()` is actually not a _listenable_ source but a _pullable_ source? Well,
we would need to modify our code and use the talkback to also request data whenever we get some:

```ts
funcA(GREET, (type, payload) => {
  let talkback;
  let N = 0;

  if (type === GREET) {
    talkback = payload;                   // --> GREET message, payload is a callbag that allows us to talk back to the source
    talkback(DATA);                       // --> pull data
  }
  else if (type === DATA) {
    console.log(payload);
    N++;
    if (N >= 5) talkback(END);            // --> We've got 5 data entries, ask the source to end.
    else talkback(DATA);                  // --> request more data
  }
});
```

---

## Callbags in Practice

In practice, you rarely need to greet sources or handle talkbacks manually. Utilities
such as those provided in callbag-common take care of all of that message passing for you:

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

[► Try It!](https://stackblitz.com/edit/callbag-common)

<br>

👉 [Read more](/callbags-in-practice) usage of callbags in practice.

---

> :ToCPrevNext