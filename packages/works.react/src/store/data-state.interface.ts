import { Observable } from 'rxjs';

/**
 * Represents a data state object that can be observed, refreshed, and mutated.
 */
export interface IZDataState<T> {
  /**
   * The data that you want to watch.
   *
   * This is normally in 3 different states.
   *
   * If the data is null, then that means that there is no value.
   * If it is undefined, then it is currently being loaded.
   * If it is an actual object, that means that it has been loaded.
   */
  readonly data?: T;

  /**
   * The observable that
   */
  readonly dataChange: Observable<T>;

  /**
   * Refreshes the current state of the data.
   */
  refresh(): Promise<T>;
}
