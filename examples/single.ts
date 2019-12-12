import { Observable } from 'rxjs';
import { ObserveOn } from '@observer/observe';

class Test {
  @ObserveOn<number>('bar') foo!: Observable<number>;
  bar?: number;
}

const test = new Test();
test.foo.subscribe(value => {
  console.log("Received: " + value);
});

test.bar = 3;