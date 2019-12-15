import { ObserveOn } from 'observer/observe';
import { Observable } from 'rxjs';

class SingleProperty<T> {
  foo!: T;
  fooChanges$!: Observable<T>;
}

test('creates observer property from any', () => {
  const target: any = {};
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