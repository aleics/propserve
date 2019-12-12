import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObserveOn } from '@observer/observe';

class Test {
  @ObserveOn<number>('first')
  private first$!: Observable<number>;
  first?: number;

  @ObserveOn<number>('second')
  private second$!: Observable<number>;
  second?: number;

  sum$ = combineLatest(this.first$, this.second$).pipe(
    map(([a, b]) => a + b)
  );
}

const test = new Test();
test.sum$.subscribe(result => {
  console.log("Sum: " + result);
})


test.first = 2;
test.second = 3;