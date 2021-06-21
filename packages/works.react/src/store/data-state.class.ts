import { Subject } from 'rxjs';
import { IZDataState } from './data-state.interface';

/**
 * Represents an implementation of the IZDataState.
 */
export class ZDataState<T> implements IZDataState<T> {
  /**
   * The data that you want to watch.
   *
   * This is normally in 3 different states.
   *
   * If the data is null, then that means that there is no value.
   * If it is undefined, then it is currently being loaded/refreshed.
   * If it is an actual object, that means that it has been loaded.
   */
  public data?: T;

  /**
   * The underlying data change object.
   */
  private _dataChange = new Subject<T>();

  /**
   * Occurs when the data object changes.
   *
   * @see data For information about the states.
   */
  public dataChange = this._dataChange.asObservable();

  /**
   * Initializes a new instance of this object.
   *
   * @param initial The initial value of the data.
   */
  public constructor(initial?: T) {
    this.data = initial;
  }

  /**
   * Sets the current data object.
   *
   * @param val The value to set.
   *
   * @returns The data that was updated.
   */
  public set(val?: T) {
    if (this.data === val) {
      // There are no changes to be made.
      return this.data;
    }

    if (val === undefined) {
      delete this.data;
    } else {
      this.data = val;
    }

    this._dataChange.next(this.data);

    return this.data;
  }
}
