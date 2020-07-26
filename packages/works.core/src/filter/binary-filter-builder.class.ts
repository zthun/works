import { IZBinaryFilter } from './binary-filter.interface';
import { ZBinaryOperator } from './binary-operator.enum';

/**
 * Represents an object that can build up a binary filter.
 */
export class ZBinaryFilterBuilder<T = any> {
  private _filter: IZBinaryFilter<T>;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._filter = {
      field: null,
      value: null,
      operator: ZBinaryOperator.Equal
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
   * Overrides the value.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public value(val: T): this {
    this._filter.value = val;
    return this;
  }

  /**
   * Constructs an equal relationship.
   *
   * @returns This object
   */
  public equal(): this {
    this._filter.operator = ZBinaryOperator.Equal;
    return this;
  }

  /**
   * Constructs a not equal filter.
   *
   * @returns This object
   */
  public notEqual(): this {
    this._filter.operator = ZBinaryOperator.NotEqual;
    return this;
  }

  /**
   * Constructs a less than filter.
   *
   * @returns This object
   */
  public lessThan(): this {
    this._filter.operator = ZBinaryOperator.LessThan;
    return this;
  }

  /**
   * Constructs a greater than filter.
   *
   * @returns This object.
   */
  public greaterThan(): this {
    this._filter.operator = ZBinaryOperator.GreaterThan;
    return this;
  }

  /**
   * Constructs a less than or equal to filter.
   *
   * @returns This object.
   */
  public lessThanEqualTo(): this {
    this._filter.operator = ZBinaryOperator.LessThanEqualTo;
    return this;
  }

  /**
   * Constructs a greater than or equal to filter.
   *
   * @returns A new filter builder object.
   */
  public greaterThanEqualTo(): this {
    this._filter.operator = ZBinaryOperator.GreaterThanEqualTo;
    return this;
  }

  /**
   * Constructs a like filter.
   *
   * @returns A new filter builder object.
   */
  public like(): this {
    this._filter.operator = ZBinaryOperator.Like;
    return this;
  }

  /**
   * Returns a copy of the currently built filter.
   *
   * @returns A copy of the currently built filter.
   */
  public build(): IZBinaryFilter {
    return { ...this._filter };
  }
}
