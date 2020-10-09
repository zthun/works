import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

/**
 * Represents to use a watchable state object that will render a component
 * when the state changes.
 *
 * @param initial The initial value.
 * @param observe The observable that will stream in changes to the value.
 * @param watch The return value.
 *
 * @returns watch
 */
export function useWatchableState<T, S>(initial: T, observe: Observable<T>, watch: S): S {
  const [, setSt] = useState(initial);

  useEffect(() => {
    const subscription = observe.subscribe((updated) => setSt(updated));
    return () => subscription.unsubscribe();
  });

  return watch;
}
