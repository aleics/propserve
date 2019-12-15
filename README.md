# observer
**observer** let's you subscribe to changes of other properties of the same class by using decorators.

## Usage
Using the [`@ObserveOn`](https://github.com/aleics/observer/blob/397fc239a3bbcc8242313141f057c0d42f8d3c5e/src/observe.ts#L3) decorator, an observer property is defined. The observer is able to subscribe to changes of other properties.

```ts
class Test {
  @ObserveOn<number>('bar') foo!: Observable<number>;
  bar: number = 1;
}

const test = new Test();
test.foo.subscribe(value => {
  console.log('Received: ' + value);
});
```

### Use case: Angular
The main motivation of this library was the lack to provide [lifecycle hooks](https://angular.io/guide/lifecycle-hooks) as [`Observable`](https://rxjs.dev/guide/observable) in the Angular framework. Specifically for [`OnChanges`](https://angular.io/api/core/OnChanges). The different component's lifecycle phases are provided by using callback methods. For instance:

```ts
@Component({
  selector: 'some',
  templateUrl: './some.component.html'
})
export class SomeComponent implements OnChanges {
  @Input() foo: number;
  @Input() bar: number;

  result: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.foo || changes.bar) {
      const sum = this.foo * this.bar;
      if (sum > 0) {
        this.result = sum;
      }
    }
  }
}
```

Two inputs are multiplied, and if the result is higher than `0`, the result is displayed.

Using **observer**, you can react to the changes of a single or multiple component's properties, and use the full power of reactive streams:

```ts
@Component({
  selector: 'some',
  templateUrl: './some.component.html'
})
export class SomeComponent {
  @Input() foo: number;
  @ObserveOn<number>('foo') fooChanges$!: Observable<number>;

  @Input() bar: number;
  @ObserveOn<number>('bar') barChanges$!: Observable<number>;

  result$ = combineLatest(this.fooChanges$, this.barChanges$).pipe(
    map(([first, second]) => first * second),
    filter(value => value > 0)
  );
}
```

By using the Angular [`async`](https://angular.io/api/common/AsyncPipe) pipe in the template, you can extract the value of `result$` once the `Observable` returns a value. Thus, the handling of both properties' changes is much simplified and functional-like.