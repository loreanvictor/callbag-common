// tslint:disable: no-magic-numbers

import { should } from 'chai'; should();
import { pipe, map, of, filter, subscribe, tap } from '../index';


describe('callbag-common', () => {
  it('should export stuff properly.', () => {
    const r: number[] = [];
    pipe(
      of(1, 2, 3, 4),
      map(x => x * 3),
      filter(x => x % 2 === 0),
      subscribe(v => r.push(v))
    );

    r.should.eql([6, 12]);
  });

  describe('tap()', () => {
    it('should tap into stuff.', () => {
      const r: number[] = [];
      pipe(
        of(1, 2, 3, 4),
        map(x => x * 3),
        filter(x => x % 2 === 0),
        tap(v => r.push(v)),
        subscribe(() => {})
      );

      r.should.eql([6, 12]);
    });
  });
});
