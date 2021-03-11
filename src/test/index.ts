// tslint:disable: no-magic-numbers

import { should } from 'chai'; should();
import subject from 'callbag-subject';
import { pipe, map, of, filter, subscribe, tap, source, take, scan, startWith } from '../index';


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

    const r3: number[] = [];
    pipe(
      of(1, 2, 3, 4),
      scan((t, x) => t + x, 0),
      take(3),
      subscribe(v => r3.push(v))
    );

    r3.should.eql([1, 3, 6]);
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

    it('should emit values to each new subscriber.', () => {
      const r: number[] = [];
      const s = source(42);
      pipe(s, subscribe(v => r.push(v)));
      pipe(s, subscribe(v => r.push(v)));

      r.should.eql([42, 42]);
    });
  });

  describe('startWith()', () => {
    it('should start with given values.', () => {
      const r1: number[] = [];

      pipe(
        of(1),
        startWith(2, 3, 4),
        take(2),
        subscribe(v => r1.push(v))
      );

      r1.should.eql([2, 3]);

      const r2: number[] = [];
      const r3: number[] = [];
      const sub = subject<number>();
      const src = pipe(sub, startWith(1, 2, 3));

      pipe(src, subscribe(v => r2.push(v)));
      pipe(src, take(4), subscribe(v => r3.push(v)));

      sub(1, 4);
      sub(1, 5);
      r2.should.eql([1, 2, 3, 4, 5]);
      r3.should.eql([1, 2, 3, 4]);
    });
  });
});
