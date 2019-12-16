import { ObserveOn } from '@propserve/observe';
import { Observable, combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';

class SingleProperty<T> {
  foo!: T;
  fooChanges$!: Observable<T>;
}

class DoubleProperty<T> {
  foo!: T;
  fooChanges$!: Observable<T>;

  bar!: T;
  barChanges$!: Observable<T>;
}

test('creates observer property from any', () => {
  const target: { fooChanges$?: Observable<number> } = {};
  const observeHandler = ObserveOn('foo');
  observeHandler(target, 'fooChanges$');

  expect(target.fooChanges$).toBeDefined();
  expect(target.fooChanges$ instanceof Observable).toEqual(true);
});

test('creates observer property from class', () => {
  const target = new SingleProperty<number>();

  const observeHandler = ObserveOn<number>('foo');
  observeHandler(target, 'fooChanges$');

  expect(target.fooChanges$).toBeDefined();
  expect(target.fooChanges$ instanceof Observable).toEqual(true);
});

test('getter remains unmodified', () => {
  const target = new SingleProperty<number>();

  const observeHandler = ObserveOn<number>('foo');
  observeHandler(target, 'fooChanges$');

  target.foo = 2;

  expect(target.foo).toEqual(2);
});

test('notifies single change', (done) => {
  const observeHandler = ObserveOn<number>('foo');

  const target = new SingleProperty<number>();
  observeHandler(target, 'fooChanges$');

  target.foo = 2;

  target.fooChanges$.subscribe(value => {
    expect(value).toEqual(2);
    done();
  });
});

test('notifies multiple change', (done) => {
  const fooObserveHandler = ObserveOn<number>('foo');
  const barObserveHandler = ObserveOn<number>('bar');

  const target = new DoubleProperty<number>();
  fooObserveHandler(target, 'fooChanges$');
  barObserveHandler(target, 'barChanges$');

  target.foo = 2;
  target.bar = 3;

  combineLatest(target.fooChanges$, target.barChanges$).pipe(
    first()
  ).subscribe({
    next: ([foo, bar]) => {
      expect(foo).toEqual(2);
      expect(bar).toEqual(3);
      done();
    },
    complete: () => done()
  });
});
