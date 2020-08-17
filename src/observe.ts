import { BehaviorSubject, Observable } from 'rxjs';

/**
 * `Observe` is a decorator that provides you the changes of an observed class's property in
 * form of an `Observable`.
 *
 * @param observedKey The key of the property that is being observed.
 */
export function Observe<T>(observedKey: string): PropertyDecorator {
  return (target: any, key: string | symbol): void => {
    const subjects = new WeakMap<any, BehaviorSubject<T | undefined>>();

    const getSubject = (instance: any): BehaviorSubject<T | undefined> | undefined => {
      if (!subjects.has(instance)) {
        subjects.set(instance, new BehaviorSubject<T | undefined>(undefined))
      }
      return subjects.get(instance);
    };

    Object.defineProperty(target, key, {
      get(): Observable<T | undefined> | undefined {
        return getSubject(this);
      }
    });

    Object.defineProperty(target, observedKey, {
      get(): T | undefined {
        return getSubject(this)?.getValue();
      },
      set(instanceNewValue: T): void {
        getSubject(this)?.next(instanceNewValue);
      }
    });
  };
}