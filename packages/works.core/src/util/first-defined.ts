/**
 * Returns the first value in args such that args is not null or undefined.
 *
 * @param fallback
 *        The fallback value in the case that all values in args are null/undefined.
 * @param first
 *        The first value to check.
 * @param remaining
 *        The remaining values beyond the first to check.
 *
 * @returns
 *        The first value if it is not null or undefined.  If first is undefined or null, then the first item
 *        in remaining such that remaining[i] is not null or undefined is returned.  If first and all values of
 *        remaining are null or undefined, then fallback is returned.
 *
 */
export function firstDefined<T = any>(fallback: T, first: T | null | undefined, ...remaining: (T | null | undefined)[]): T {
  if (first != null) {
    return first;
  }

  for (let i = 0; i < remaining.length; ++i) {
    if (remaining[i] != null) {
      return remaining[i] as T;
    }
  }

  return fallback;
}
