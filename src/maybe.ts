import { DATA, END, Source, START } from 'callbag';


export type MaybeSource<T> = T | Source<T>;

export function source<T>(maybe: MaybeSource<T>): Source<T> {
  if (typeof maybe === 'function' && maybe.length === 2) {
    return maybe as Source<T>;
  } else {
    return (start: START | DATA | END, sink: any) => {
      if (start === 0) {
        let end = false;

        sink(0, (t: END) => {
          if (t === 2) {
            end = true;
          }
        });

        sink(1, maybe as T);
        if (!end) {
          sink(2);
        }
      }
    };
  }
}
