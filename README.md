# observer
**observer** let's you subscribe to changes from other properties.

## Usage
Using the [`@ObserveOn`](https://github.com/aleics/observer/blob/397fc239a3bbcc8242313141f057c0d42f8d3c5e/src/observe.ts#L3) decorator, `observer` notifies you on changes from other properties:

```ts
class Test {
  bar: number = 0;
  @ObserveOn<number>('bar') foo!: Observable<number>;
}

const test = new Test();
test.foo.subscribe(value => {
  console.log("Received: " + value);
});

test.bar = 3;
```
