/**
 * Same as lodash identity, but returns a promise instead of the value.
 *
 * @param val The value to return.
 *
 * @returns A promise that resolves to val.
 */
export async function identityAsync<T = any>(val: T): Promise<T> {
  return val;
}
