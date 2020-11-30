<div align="center">
  <img src="/callbag.svg" width="156"/>
  <br><br>
  <h1>What are callbags?</h1>
  <br><br>
</div>

**TLDR**, A _callback_ is a function we pass to another, _source_ function, in order to give the _source_ function
a way to talk back to us (call us back). [Callbag](https://github.com/callbag/callbag) is a standard
for callbacks that enables working with streams. A _callbag_ is any callback that follows that standard.

<br>

---

<br>

## Callbacks

Take this code:

```ts
console.log(source());
```

When we run this code:

1. `source()` is called. We wait for its output.
2. We log the output from `source()`.


<br>

What if `source()` takes some time to produce data? Instead of waiting for it,
we could tell it to "give us data" (by calling it), and give it a way to call us back
when it has some data:

```ts
source(data => console.log(data));
```

<br>

Here, `data => console.log(data)` is a _callback_, as its the method we provide
`source()` to call us back when it has data. `source` is basically a _source_ of data, and we can communicate
with it as follows:

```bash | --no-term
=> [GREETING] "Give me data when you have it" # --> us to source
<= [DATA]     "Here is some data"             # --> source to us
```

<br>

---

<br>

## Streams

Now what if our source (e.g. `source()`)
produces an indeterminate number of data entries? For example, our source might be
a function responsible for calculating the position of the cursor on X-axis, or it might be a function who is supposed
to give us messages coming from a web-socket.

> 👉 A source that produces an indeterminate number of data entries at indeterminate time intervals
>   is called a _stream_.

<br>

In this case our simplistic callback (or the communication scheme) will be rather limiting:
- We might want to tell the source to stop sending more data.
- The source might want to tell us that it won't send more data (maybe due to some error).
- Some sources push data whenever possible. Others might wait for us to ask them explicitly for more data, in which
  case we would need to be able to ask for more data as well.

<br>

None of these are available under our previous communication scheme. This is the expanded communication scheme we want
for streams:

```bash | --no-term
=> [GREETING] "Give me data whenever you have some"                              # --> us to source
<= [GREETING] "I will give you data whenever I have some. Tell me when to stop"  # --> source to us

<= [DATA]     "Here is some data"                                                # --> source to us
=> [DATA]     "Give me more data"                                                # --> us to source, when it needs to be pulled

=> [END]      "Stop sending more data"                                           # --> us to source
<= [END]      "I won't be sending more data (because of X)"                      # --> source to us
```

<br>

To accomodate it we can have our callback accept two arguments instead of one:
The first argument denoting the type of the message, the second one denoting the content (or payload):

```ts
source((type, payload) => {
  if (type === GREET) console.log('Listening ...');
  if (type === DATA) console.log(payload);
  if (type === END) console.log('Source ended!');
});
```

<br>

---

<br>

## Callbags

Callbag is just a term to denote any callback (or function) that looks like
the callback we just designed for talking with `source()`. In other words, any function with the following
signature is a callbag:

```ts
(type: GREET | DATA | END, payload?: any) => void;
```

> 👉 In the [callbag spec](https://github.com/callbag/callbag), message types are denoted
> by numbers:
> - `0` stands for `GREET` (also called `START`)
> - `1` stands for `DATA`
> - `2` stands for `END`.

<br>

Now lets look at the above example again:

```ts
source((type, payload) => {
  if (type === GREET) console.log('Listening ...');
  if (type === DATA) console.log(payload);
  if (type === END) console.log('Source ended!');
});
```

<br>

Here, `source` is NOT a callbag, since it only accepts one argument. We can _fix_ that by making `source` accept two
arguments as well, in which case our code would change like this:

```ts
source(GREET, (type, payload) => {
  if (type === GREET) console.log('Listeing ...');
  if (type === DATA) console.log(payload);
  if (type === END) console.log('Source ended!');
});
```

<br>

Now what if we want to receive a limited number of data entries (say 5) from `source`?
We greeted `source` by calling it with `GREET` alongside a callbag. According to our communication scheme,
`source` needs to also greet us by sending us `GREET` alongside _a way to tell it to stop_, i.e. another callbag:

```ts
let talkback;
let N = 0;

source(GREET, (type, payload) => {
  if (type === GREET) {
    talkback = payload;                // --> when type is GREET, payload is a callbag
    console.log('Listening ...');
  }

  if (type === DATA) {
    console.log(payload);             // --> when type is DATA, payload is the data sent by source
    N++;
    if (N >= 5) talkback(END);        // --> telling the source to stop
  }

  if (type === END) console.log('Source ended!');
});
```

> 👉 So whenever someone greets someone (us greeting the source, the source greeting us), the payload
> should be another callbag, acting as a way to talk back to the greeter. In this example,
> `talkback` plays that role.

<br>

---

<br>

## Callbag Sources

So far we've just worked with `source()` as a stream, without looking inside it. But how would a callbag source
actually look like? To see that, lets build a simple callbag source that outputs an increasing number every second:

```ts
const source = (type, payload) => {
  if (type === GREET) {                           // --> everything starts with a GREET
    let talkback = payload;                       // --> when greeted, the payload is a way to talk back to the greeter
    let i = 0;

    setInterval(() => talkback(DATA, i++), 1000); // --> lets tell the greeter about our increasing number every second
  }
}
```

<br>

☝️ Here, we are not giving the caller any method of telling the source to stop sending more data. This is because
we are not following the communication protocol properly: the source MUST greet back and provide a way of talking back (i.e. another callbg):

```ts
const source = (type, payload) => {
  if (type === GREET) {
    let talkback = payload;
    let i = 0;

    const interval = setInterval(() => talkback(DATA, i++), 1000);

    talkback(GREET, (_type, _payload) => {
      if (_type === END) clearInterval(interval);
    });
  }
}
```

[► Try It!](https://stackblitz.com/edit/callbag-concept?file=index.ts)

<br>

---

<br>

## Callbags in Practice

In practice, you rarely need to greet sources or handle talkbacks manually. Utilities
such as those provided in [callbag-common](/) take care of that for you:

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

The workflow is typically like this:

👉 You create some callbag sources, using [source factories](/#source-factories):

```ts
import { interval } from 'callbag-common';

const source = interval(1000);
```

<br>

👉 You then transform these sources using [operators](/#operators). \
For example,
you might want to multiply each received number by `3`:

```ts
import { interval, map } from 'callbag-common';

let source = interval(1000);
source = map(n => n * 3)(source);
```

Or you might want to only pick odd numbers:

```ts
import { interval, map, filter } from 'callbag-common';

let source = interval(1000);
source = map(n => n * 3)(source);
source = filter(n => n % 2)(source);
```

<br>

👉 Finally, you start listening to your transformed source by subscribing to it:

```ts
import { interval, map, filter, subscribe } from 'callbag-common';

let source = interval(1000);
source = map(n => n * 3)(source);
source = filter(n => n % 2)(source);

subscribe(console.log)(source);
```

<br>

> 👉 It is also highly recommended to use the `pipe()` utility for transforming your sources and subscribing to them,
> as it makes the code much easier to read:
> ```ts
> import { interval, map, filter, subscribe, pipe } from 'callbag-common';
>
> pipe(
>   interval(1000),
>   map(n => n * 3),
>   filter(n => n % 2),
>   subscribe(console.log)
> )
> ```

<br>

---

<br>

> :ToCPrevNext