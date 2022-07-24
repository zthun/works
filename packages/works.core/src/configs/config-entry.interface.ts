/**
 * Represents a configuration entry.
 *
 * The id of the config entry can be properly identified as (scope).(key)
 */
export interface IZConfigEntry<T = any> {
  /**
   * The id of the config entry.
   *
   * This will normally be (scope).(key)
   */
  _id: string;

  /**
   * The named scope of where the value is used for.
   */
  scope: string;

  /**
   * The key of the config entry.
   *
   * Keys do not need to be unique, but must be unique within their
   * respective scopes.
   */
  key: string;

  /**
   * The value of the entry.
   */
  value: T;
}
