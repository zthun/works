import { useSafeState } from './use-safe-state';

/**
 * A type of safe state where the value is used from the props in the case of them being set.
 *
 * Otherwise, an internal set of properties are used.  This is useful in the case that you
 * want to allow properties to control the state of the component, but this functionality is
 * to be optional.
 *
 * @param current
 *        The current value from the props.  If this is
 *        undefined, then the internal state is used.
 * @param setCurrent
 *        The mutator method to set the current value.  This can
 *        be undefined, but if it is set, both the internal value and
 *        the prop value are set.
 *
 * @returns
 *        A tuple where the first item is the current state and the 2nd item is a mutator
 *        method to modify the state.
 */
export function useAmbassadorState<T>(
  current: T | undefined,
  setCurrent: ((val: T) => void) | undefined
): [T | undefined, (val: T) => void] {
  const [localCurrent, setLocalCurrent] = useSafeState<T | undefined>(current);

  const _current = current === undefined ? localCurrent : current;

  const _setCurrent = (val: T) => {
    setLocalCurrent(val);

    if (setCurrent) {
      setCurrent(val);
    }
  };

  return [_current, _setCurrent];
}
