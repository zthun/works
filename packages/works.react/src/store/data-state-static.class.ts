import { Subject } from 'rxjs';
import { IZDataState } from './data-state.interface';

/**
 * Represents a data state that can never change.
 */
export class ZDataStateStatic<T> implements IZDataState<T> {
  /**
   * Occurs when the profile object changes.
   *
   * @see profile For information about the states.
   */
  public dataChange = new Subject<T>();

  /**
   * Initializes a new instance of this object.
   *
   * @param data The immutable data.
   */
  public constructor(public data?: T) {}

  /**
   * Returns a resolved promise with the given profile.
   *
   * @returns A resolved promise with the given profile.
   */
  public refresh(): Promise<T> {
    return Promise.resolve(this.data);
  }
}
