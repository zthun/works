/**
 * Represents a key on a keyboard.
 */
export interface ZCircusKey {
  /**
   * The key value when the shift key is not pressed.
   */
  lower: string;
  /**
   * The key value when the shift key is pressed.
   */
  upper: string;
  /**
   * The keycode of the actual key on the keyboard.
   */
  code: string;
}

/**
 * Constructs a ZCircusKey object.
 *
 * @param lower
 *        The key value when the shift key is not pressed.
 * @param code
 *        The keycode.
 * @param upper
 *        The key value when the  shift key is pressed.
 *
 * @returns
 *        A ZCircusKey object.
 */
export function code(lower: string, code: string, upper = lower) {
  return {
    lower,
    code,
    upper
  };
}
