import of from 'callbag-of';
import { Source } from 'callbag';


export type MaybeSource<T> = T | Source<T>;

export function source<T>(maybe: MaybeSource<T>): Source<T> {
  if (typeof maybe === 'function' && maybe.length === 2) {
    return maybe as Source<T>;
  } else {
    return of(maybe as T);
  }
}
