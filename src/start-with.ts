import { DATA, END, Source, START } from 'callbag';

export function startWith<A, T>(
  ...initial: A[]
): (src: Source<T>) => Source<A | T> {
  return src => (start: START | DATA | END, sink?: any) => {
    if (start !== 0) { return; }

    const init = initial.slice();

    let disposed = false;
    let talkback: any;
    let trackPull = false;
    let lastPull: any;

    sink(0, (t: START | DATA | END, d?: any) => {
      if (trackPull && t === 1) {
        lastPull = [1, d];
      }

      if (t === 2) {
        disposed = true;
        init.length = 0;
      }

      if (!talkback) {
        return;
      }

      talkback(t, d);
    });

    while (init.length !== 0) {
      if (init.length === 1) {
        trackPull = true;
      }

      sink(1, init.shift());
    }

    if (disposed) {
      return;
    }

    src(0, (t: START | DATA | END, d?: any) => {
      if (t === 0) {
        talkback = d;
        trackPull = false;

        if (lastPull) {
          talkback(...lastPull);
          lastPull = null;
        }

        return;
      }

      sink(t, d);
    });
  };
}
