import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

/**
 * Represents to use a watchable state object that will rerender a component
 * when the state changes.
 */
export function useWatchableState<T, S extends { change: Observable<T> }>(initial: T, obj: S): S {
  const [st, setSt] = useState(initial);

  useEffect(() => {
    const subscription = obj.change.subscribe((updated) => setSt(updated));
    return () => subscription.unsubscribe();
  });

  return obj;
}
