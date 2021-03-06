import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObserveOn } from '@propserve/observe';

class Test {
  @ObserveOn<number>('first')
  private first$!: Observable<number>;
  first = 2;

  @ObserveOn<number>('second')
  private second$!: Observable<number>;
  second = 2;

  sum$ = combineLatest(this.first$, this.second$).pipe(
    map(([a, b]) => a + b)
  );
}

const test = new Test();
test.sum$.subscribe(result => {
  console.log('Sum: ' + result);
})

test.second = 3;