import { Subject } from 'rxjs';

export function ObserveOn<T>(observedKey: string) {
  const listener = new Subject<T>();

  return (target: any, key: string) => {
    let observedValue: T = target[observedKey];
    target[key] = listener.asObservable();

    const getter = () => observedValue;
    const setter = (value: T) => {
      listener.next(value);
      observedValue = value;
    };

    // redefine the observed property to allow
    // the notification of updates to the
    // `listener`
    Reflect.deleteProperty(target, observedKey);
    Reflect.defineProperty(target, observedKey, {
        get: getter,
        set: setter
    });
  };
}