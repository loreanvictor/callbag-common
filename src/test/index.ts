// tslint:disable: no-magic-numbers

import { should } from 'chai'; should();
import { pipe, map, of, filter, subscribe, tap, take } from '../index';
import { source } from '../maybe';


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

    const r2: number[] = [];
    pipe(
      of(1, 2, 3, 4),
      map(x => x * 3),
      take(2),
      subscribe(v => r2.push(v))
    );

    r2.should.eql([3, 6]);
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

  describe('source()', () => {
    it('should convert values to sources.', done => {
      pipe(
        source(42),
        map(x => x * 3),
        subscribe(v => {
          v.should.equal(42 * 3);
          done();
        })
      );
    });

    it('should keep sources as is.', () => {
      const src = of(42);
      source(src).should.equal(src);
    });
  });
});
