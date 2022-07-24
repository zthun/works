/**
 * Operators for a unary filter.
 */
export enum ZUnaryOperator {
  /**
   * Is null.
   */
  IsNull = 'null',
  /**
   * Is not null.
   */
  IsNotNull = 'is-not-null'
}

/**
 * Represents a yes/no style filter.
 */
export interface IZUnaryFilter {
  /**
   * The field to apply the filter on.
   */
  field: string;
  /**
   * The operator for the filter.
   */
  operator: ZUnaryOperator;
}

/**
 * Represents a builder for a UnaryFilter object.
 */
export class ZUnaryFilterBuilder {
  private _filter: IZUnaryFilter;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._filter = {
      field: '',
      operator: ZUnaryOperator.IsNull
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
   * Sets the operator to is null.
   *
   * @returns This object.
   */
  public isNull(): this {
    this._filter.operator = ZUnaryOperator.IsNull;
    return this;
  }

  /**
   * Sets the operator to is null.
   *
   * @returns This object.
   */
  public isNotNull(): this {
    this._filter.operator = ZUnaryOperator.IsNotNull;
    return this;
  }

  /**
   * Returns a copy of the built filter.
   *
   * @returns A copy of the current filter.
   */
  public build(): IZUnaryFilter {
    return { ...this._filter };
  }
}
