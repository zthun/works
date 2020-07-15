import { FilterQuery } from 'mongodb';

/**
 * The filter query type;
 */
export { FilterQuery } from 'mongodb';

/**
 * Ascending sort.
 */
export const SortAscending = 1;

/**
 * Descending sort.
 */
export const SortDescending = -1;

/**
 * Sort direction
 */
export type SortDirection = 1 | -1;

/**
 * The sort criteria array.
 */
export type SortCriteria = Array<{ key: string; direction: 1 | -1 }>;

/**
 * The join criteria.
 */
export type JoinCriteria = Array<{ from: string; local: string; foreign: string; as: string }>;

/**
 * Represents a query to run against a database.
 *
 * The query object uses the builder pattern to modify the
 * results.
 */
export interface IZDatabaseQuery<R> {
  /**
   * The current filter.
   */
  readonly $filter: FilterQuery<any>;

  /**
   * The current join.
   */
  readonly $join: JoinCriteria;

  /**
   * The current sort.
   */
  readonly $sort: SortCriteria;

  /**
   * The current page.
   */
  readonly $page: number;

  /**
   * The current page size.
   */
  readonly $size: number;

  /**
   * Copies the entire contents of another query into this query.
   *
   * @param other The query to copy.
   *
   * @returns This object.
   */
  copy(other: IZDatabaseQuery<R>): IZDatabaseQuery<R>;

  /**
   * Sets the filter for the query.  The default is nothing.
   *
   * @param filter The filter query.
   *
   * @returns This object.
   */
  filter(filter: FilterQuery<any>): IZDatabaseQuery<R>;

  /**
   * Sets criteria to join on.
   *
   * @param join The join criteria.
   *
   * @returns This object.
   */
  joins(join: JoinCriteria): IZDatabaseQuery<R>;

  /**
   * Adds a join criteria.
   *
   * @param from The collection to join on.
   * @param local The local field to match.
   * @param foreign The field from 'from' to match on.
   * @param as The output name of the field.
   *
   * @returns This object.
   */
  join<F, J>(from: string, local: keyof F, foreign: keyof J, as: string): IZDatabaseQuery<R>;

  /**
   * Sets the sort criteria.
   *
   * @param sort The sort criteria.
   *
   * @return This object.
   */
  sorts(sort: SortCriteria): IZDatabaseQuery<R>;

  /**
   * Adds a sort to the criteria.
   *
   * @param key The key to sort by.
   * @param direction The sorting direction.
   *
   * @return This object.
   */
  sort(key: string, direction: SortDirection): IZDatabaseQuery<R>;

  /**
   * Sets the page to retrieve.  The default is the first page.
   *
   * @param page The page to retrieve.
   *
   * @return This object.
   */
  page(page: number): IZDatabaseQuery<R>;

  /**
   * Sets the page size.  The default is infinity.
   *
   * @param size The page size.
   *
   * @return This object.
   */
  size(size: number): IZDatabaseQuery<R>;

  /**
   * Runs the query.
   *
   * @returns A promise that, when resolved, has ran and completed the query or transaction according to the parameters.
   */
  run(): Promise<R>;
}
