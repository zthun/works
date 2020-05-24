import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

/**
 * Represents to use a watchable state object that will rerender a component
 * when the state changes.
 */
export function useWatchableState<T, S>(initial: T, observe: Observable<T>, watch: S): S {
  const [st, setSt] = useState(initial);

  useEffect(() => {
    const subscription = observe.subscribe((updated) => setSt(updated));
    return () => subscription.unsubscribe();
  });

  return watch;
}
