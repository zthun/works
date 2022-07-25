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
  readonly data: T | null | undefined;

  /**
   * The observable that streams in changes to the data.
   */
  readonly dataChange: Observable<T | null | undefined>;

  /**
   * Sets the data state.
   *
   * This can be undefined, null, or an actual value.
   *
   * @param val The value to set.  Use the convention that undefined is loading, null is no value, and truthy is loaded and has a value.
   */
  set(val?: T | null): void;
}
