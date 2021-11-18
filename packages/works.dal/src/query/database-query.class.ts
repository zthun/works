import { Filter, IZDatabaseQuery, JoinCriteria, SortCriteria, SortDirection } from './database-query.interface';

/**
 * Represents an implementation of the IZDatabaseQuery interface.
 */
export class ZDatabaseQuery<R> implements IZDatabaseQuery<R> {
  private _filter: Filter<any> = {};
  private _sort: SortCriteria = [];
  private _page = 0;
  private _size = Infinity;
  private _join: JoinCriteria = [];

  /**
   * Gets the current filter.
   *
   * @returns The current filter.
   */
  public get $filter(): Filter<any> {
    return this._filter;
  }

  /**
   * Gets the current sort.
   *
   * @returns The current sort.
   */
  public get $sort(): SortCriteria {
    return this._sort;
  }

  /**
   * Gets the current page.
   *
   * @returns The current page.
   */
  public get $page(): number {
    return this._page;
  }

  /**
   * Gets the current page size.
   *
   * @returns The current page size.
   */
  public get $size(): number {
    return this._size;
  }

  /**
   * Gets the current join.
   *
   * @returns The current join.
   */
  public get $join(): JoinCriteria {
    return this._join;
  }

  /**
   * Initializes a new instance of this object.
   *
   * @param _do The invoke action for the query.
   */
  public constructor(private _do: (query: ZDatabaseQuery<R>) => Promise<R>) {}

  /**
   * Copies another query into this query.
   *
   * @param other The query to copy.
   *
   * @returns This object.
   */
  public copy(other: IZDatabaseQuery<R>): ZDatabaseQuery<R> {
    this._filter = other.$filter;
    this._sort = other.$sort;
    this._page = other.$page;
    this._size = other.$size;
    this._join = other.$join;
    return this;
  }

  /**
   * Sets the filter.
   *
   * @param filter The filter to use.
   *
   * @returns This object.
   */
  public filter(filter: Filter<any>): this {
    this._filter = filter;
    return this;
  }

  /**
   * Sets the entire sort criteria.
   *
   * @param sort The sort criteria.
   *
   * @returns This object.
   */
  public sorts(sort: SortCriteria): this {
    this._sort = sort;
    return this;
  }

  /**
   * Updates the current sort criteria by adding one.
   *
   * @param key The sort key.
   * @param direction The direction to sort.
   *
   * @returns This object.
   */
  public sort(key: string, direction: SortDirection): this {
    this._sort = this._sort.concat([{ key, direction }]);
    return this;
  }

  /**
   * Sets the page.
   *
   * @param page The 0 based page index.
   *
   * @returns This object.
   */
  public page(page: number): this {
    this._page = page;
    return this;
  }

  /**
   * Sets the page size.
   *
   * @param size The page size.
   *
   * @returns This object.
   */
  public size(size: number): this {
    this._size = size;
    return this;
  }

  /**
   * Sets criteria to join on.
   *
   * @param join The join criteria.
   *
   * @returns This object.
   */
  public joins(join: JoinCriteria): this {
    this._join = join;
    return this;
  }

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
  public join<L, F>(from: string, local: keyof L, foreign: keyof F, as: string): this {
    this._join.push({ from, local: `${local}`, foreign: `${foreign}`, as });
    return this;
  }

  /**
   * Invokes the action.
   *
   * @returns A promise that when resolved, has returned the results of the query.
   */
  public run(): Promise<R> {
    return this._do(this);
  }
}
