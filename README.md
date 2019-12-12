# observer
**observer** let's you subscribe to changes of other properties of the same class by using decorators.

## Usage
Using the [`@ObserveOn`](https://github.com/aleics/observer/blob/397fc239a3bbcc8242313141f057c0d42f8d3c5e/src/observe.ts#L3) decorator, an observer property is defined. The observer is able to subscribe to changes of other properties.

```ts
class Test {
  @ObserveOn<number>('bar') foo!: Observable<number>;
  bar?: number;
}

const test = new Test();
test.foo.subscribe(value => {
  console.log("Received: " + value);
});

test.bar = 3;
```
