import { useEffect, useMemo, useState } from 'react';

/**
 * A method that can replace useState and is safe to invoke when
 * the component is unmounted.
 *
 * @param initial The initial value of the state or a function that returns the initial state
 *
 * @returns A tuple where the first element is the current state, and the second
 *          element is the setter for the state.
 */
export function useSafeState<T>(initial: T | (() => T)): [T, (val: T | ((v: T) => T)) => void] {
  const abort = useMemo(() => new AbortController(), []);
  useEffect(() => () => abort.abort(), []);
  const [state, setState] = useState(initial);

  const setSafe = (val: T) => {
    if (abort.signal.aborted) {
      return;
    }
    setState(val);
  };

  return [state, setSafe];
}
