import { Observable } from 'rxjs';
import { ObserveOn } from '@propserve/observe';
import { map } from 'rxjs/operators';

class Test {
  @ObserveOn<number>('bar')
  foo!: Observable<number>;

  bar = 1;

  double$ = this.foo.pipe(
    map(value => value * 2)
  );
}

const test = new Test();
test.foo.subscribe(value => {
  console.log('Original: ' + value);
});
test.double$.subscribe(value => {
  console.log('Double: ' + value);
})

test.bar = 3;