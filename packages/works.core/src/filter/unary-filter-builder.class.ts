import { IUnaryFilter } from './unary-filter.interface';
import { ZUnaryOperator } from './unary-operator.enum';

/**
 * Represents a builder for a UnaryFilter object.
 */
export class UnaryFilterBuilder {
  /**
   * Creates an isNull filter.
   *
   * @param field The field to check.
   *
   * @returns A new filter builder.
   */
  public static isNull(field: string): UnaryFilterBuilder {
    return new UnaryFilterBuilder(field, ZUnaryOperator.IsNull);
  }

  /**
   * Creates an isNotNull filter.
   *
   * @param field The field to check.
   *
   * @returns A new filter builder.
   */
  public static isNotNull(field: string): UnaryFilterBuilder {
    return new UnaryFilterBuilder(field, ZUnaryOperator.IsNotNull);
  }

  private _filter: IUnaryFilter;

  /**
   * Initializes a new instance of this object.
   *
   * @param field The field to operate on.
   * @param operator The operator to apply to the field.
   */
  private constructor(field: string, operator: ZUnaryOperator) {
    this._filter = {
      field,
      operator
    };
  }

  /**
   * Returns a copy of the built filter.
   *
   * @return A copy of the current filter.
   */
  public filter(): IUnaryFilter {
    return JSON.parse(JSON.stringify(this._filter));
  }
}
