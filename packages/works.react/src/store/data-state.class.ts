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
  public data?: T = null;
  /**
   * Occurs when the data object changes.
   *
   * @see data For information about the states.
   */
  public dataChange = new Subject<T>();

  /**
   * Initializes a new instance of this object.
   *
   * @param refreshFn The method to refresh the data.  This can handle errors and recover if desired, but if
   *                  it does not, then this object will null out the data on failure.
   */
  public constructor(private refreshFn: () => Promise<T>) {
    this.refresh();
  }

  /**
   * Refreshes the data.
   *
   * @returns A promise that, when resolved, has updated the data.
   */
  public async refresh(): Promise<T> {
    delete this.data;
    this.dataChange.next();

    try {
      this.data = await this.refreshFn();
    } catch {
      this.data = null;
    }

    this.dataChange.next(this.data);
    return this.data;
  }
}
