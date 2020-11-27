import { DATA, END, Source, START } from 'callbag';


export function tap<T>(o: (t: T) => void): (src: Source<T>) => Source<T> {
  return src => (start: START | DATA | END, sink?: any) => {
    if (start !== 0) { return; }

    src(0, (t: START | DATA | END, d?: any) => {
      if (t === 1) { o(d); }
      sink(t, d);
    });
  };
}
