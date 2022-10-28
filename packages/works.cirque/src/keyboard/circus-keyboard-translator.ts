import { ZCircusKey } from './circus-key';
import { ZCircusKeyboardQwerty } from './circus-keyboard-qwerty';

/**
 * A translator that can convert from codes and keys to ZCircusKey objects.
 */
export class ZCircusKeyboardTranslator {
  public static readonly Qwerty = new ZCircusKeyboardTranslator(Object.values(ZCircusKeyboardQwerty));

  private _lowerCaseToKeyValue = new Map<string, ZCircusKey>();
  private _upperCaseToKeyValue = new Map<string, ZCircusKey>();
  private _keyCodeToKeyValue = new Map<string, ZCircusKey>();

  /**
   * Initializes a new instance of this object.
   *
   * @param keys
   *        The collection of keys to support.
   */
  public constructor(keys: ZCircusKey[]) {
    keys.forEach((key) => {
      this._lowerCaseToKeyValue.set(key.lower, key);
      this._upperCaseToKeyValue.set(key.upper, key);
      this._keyCodeToKeyValue.set(key.code, key);
    });
  }

  /**
   * Translates the key or code to a ZCircusKey
   *
   * @param keyOrCode
   *        The code value (upper or lower case) or
   *        keycode value to translate.
   *
   * @returns
   *        The actual key representation of the specified key
   *        or null if no such key exists.
   */
  public translate(keyOrCode: string): ZCircusKey | null {
    return (
      this._lowerCaseToKeyValue.get(keyOrCode) ||
      this._upperCaseToKeyValue.get(keyOrCode) ||
      this._keyCodeToKeyValue.get(keyOrCode) ||
      null
    );
  }
}
