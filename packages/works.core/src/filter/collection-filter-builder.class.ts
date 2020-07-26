import { IZCollectionFilter } from './collection-filter.interface';
import { ZCollectionOperator } from './collection-operator.enum';

/**
 * Represents a builder for a collection filter.
 */
export class ZCollectionFilterBuilder<T = any> {
  private _filter: IZCollectionFilter<T>;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._filter = {
      field: null,
      operator: ZCollectionOperator.In,
      values: []
    };
  }

  /**
   * Sets the field.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public field(val: string): this {
    this._filter.field = val;
    return this;
  }

  /**
   * Sets all of the values.
   *
   * @param values The collection of values.
   *
   * @returns This object.
   */
  public values(values: any[]): this {
    this._filter.values = values;
    return this;
  }

  /**
   * Adds a value to the existing collection of values.
   *
   * @param value The value to add.
   *
   * @returns This object.
   */
  public value(value: any): this {
    this._filter.values.push(value);
    return this;
  }

  /**
   * Constructs an in filter.
   *
   * @returns This object.
   */
  public in(): this {
    this._filter.operator = ZCollectionOperator.In;
    return this;
  }

  /**
   * Constructs a not in filter.
   *
   * @returns This object.
   */
  public notIn(): this {
    this._filter.operator = ZCollectionOperator.NotIn;
    return this;
  }

  /**
   * Returns a copy of the constructed filter.
   *
   * @returns A copy of the currently built filter.
   */
  public build(): IZCollectionFilter<T> {
    return JSON.parse(JSON.stringify(this._filter));
  }
}
