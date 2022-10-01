/**
 * Requires a value to be non null.
 *
 * @param val
 *        The value to require.  This can be a promise
 *        that can return null or undefined in addition to the
 *        value.
 *
 * @returns
 *        This method returns val if it is not null
 *        or undefined, otherwise, an error is thrown.
 *
 * @throws
 *        An error if the value is null or undefined.
 */
export async function required<T>(val: T | null | undefined | Promise<T | null | undefined>): Promise<T> {
  if (val == null) {
    throw new Error('A required value was not provided');
  }

  const _val = await val;

  if (_val == null) {
    throw new Error('A required value was not provided');
  }

  return _val;
}

/**
 * Allows an async value to return null if it gets rejected.
 *
 * @param val
 *        The value to wait on.
 *
 * @returns A promise that resolves to val if it resolves, or null
 *          if it rejects.
 */
export async function optional<T>(val: Promise<T>): Promise<T | null> {
  try {
    return await val;
  } catch {
    return null;
  }
}
