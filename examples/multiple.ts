import { Observable, combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ObserveOn } from '@observer/observe';

class Test {
  @ObserveOn<number>('first')
  private first$!: Observable<number>;
  private first?: number;

  @ObserveOn<number>('second')
  private second$!: Observable<number>;
  private second?: number;

  public sum$ = combineLatest(this.first$, this.second$).pipe(
    map(([a, b]) => a + b)
  );

  public setFirst(value: number) {
    this.first = value;
  }

  public setSecond(value: number) {
    this.second = value;
  }
}

const test = new Test();
test.sum$.subscribe(result => {
  console.log("Sum: " + result);
})


test.setFirst(2);
test.setSecond(3);