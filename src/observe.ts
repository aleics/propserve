import { ReplaySubject } from 'rxjs';

/**
 * `ObserverOn` is a decorator that provides you the changes of an observed class's property in
 * form of an `Observable`. It uses a `ReplaySubject` with a buffer size of 1 slot as a listener,
 * so that the initial value of the stream is also notified to the subscriber. The observed
 * property's setter is overwritten with a notification logic to the listener.
 *
 * @param observedKey The key of the property that is being observed.
 */
export function ObserveOn<T>(observedKey: string): PropertyDecorator {
  const listener = new ReplaySubject<T>(1);
  return (target: any, key: string | symbol): void => {
    let observedValue: T = target[observedKey];
    target[key] = listener.asObservable();

    const getter = (): T => observedValue;
    const setter = (value: T): void => {
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