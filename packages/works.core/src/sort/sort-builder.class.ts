import { ZSortDirection } from './sort-direction.enum';
import { IZSort } from './sort.interface';

/**
 * Represents a builder for a sort list.
 */
export class ZSortBuilder {
  private _sort: IZSort[];

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._sort = [];
  }

  /**
   * Adds an ascending order clause.
   *
   * @param field The field to sort by.
   * @param direction The sort direction.
   *
   * @returns This object
   */
  public ascending(field: string): this {
    this._sort.push({ field, direction: ZSortDirection.Ascending });
    return this;
  }

  /**
   * Adds a descending order clause.
   *
   * @param field The field to sort by.
   *
   * @returns This object
   */
  public descending(field: string): this {
    this._sort.push({ field, direction: ZSortDirection.Descending });
    return this;
  }

  /**
   * Returns the current sort state.
   *
   * @returns The current sort state.
   */
  public build(): IZSort[] {
    return JSON.parse(JSON.stringify(this._sort));
  }
}
