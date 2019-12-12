import { Subject } from 'rxjs';

export function ObserveOn<T>(changesProperty: string) {
  const listener = new Subject<T>();

  return (target: any, propertyKey: string) => {
    target[propertyKey] = listener.asObservable();

    let value = target[changesProperty];
    const getter = () => value;
    const setter = (val: T) => {
      listener.next(val);
      value = val;
    }

    Reflect.deleteProperty(target, changesProperty);
    Reflect.defineProperty(target, changesProperty, {
        get: getter,
        set: setter
    });
  };
}