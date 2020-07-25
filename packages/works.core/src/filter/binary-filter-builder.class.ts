import { IBinaryFilter } from './binary-filter.interface';
import { BinaryOperator } from './binary-operator.enum';

/**
 * Represents an object that can build up a binary filter.
 */
export class BinaryFilterBuilder {
  /**
   * Constructs an equal filter.
   *
   * @param field The field to compare against.
   * @param value [optional] The value to match.
   *
   * @return A new filter builder object.
   */
  public static equal(field: string, value: any = ''): BinaryFilterBuilder {
    return new BinaryFilterBuilder(field, value, BinaryOperator.Equal);
  }

  /**
   * Constructs a not equal filter.
   *
   * @param field The field to compare against.
   * @param value [optional] The value to match.
   *
   * @return A new filter builder object.
   */
  public static notEqual(field: string, value: any = ''): BinaryFilterBuilder {
    return new BinaryFilterBuilder(field, value, BinaryOperator.NotEqual);
  }

  /**
   * Constructs a less than filter.
   *
   * @param field The field to compare against.
   * @param value [optional] The value to match.
   *
   * @return A new filter builder object.
   */
  public static lessThan(field: string, value: any = ''): BinaryFilterBuilder {
    return new BinaryFilterBuilder(field, value, BinaryOperator.LessThan);
  }

  /**
   * Constructs a greater than filter.
   *
   * @param field The field to compare against.
   * @param value [optional] The value to match.
   *
   * @return A new filter builder object.
   */
  public static greaterThan(field: string, value: any = ''): BinaryFilterBuilder {
    return new BinaryFilterBuilder(field, value, BinaryOperator.GreaterThan);
  }

  /**
   * Constructs a less than or equal to filter.
   *
   * @param field The field to compare against.
   * @param value [optional] The value to match.
   *
   * @return A new filter builder object.
   */
  public static lessThanEqualTo(field: string, value: any = ''): BinaryFilterBuilder {
    return new BinaryFilterBuilder(field, value, BinaryOperator.LessThanEqualTo);
  }

  /**
   * Constructs a greater than or equal to filter.
   *
   * @param field The field to compare against.
   * @param value [optional] The value to match.
   *
   * @return A new filter builder object.
   */
  public static greaterThanEqualTo(field: string, value: any = ''): BinaryFilterBuilder {
    return new BinaryFilterBuilder(field, value, BinaryOperator.GreaterThanEqualTo);
  }

  /**
   * Constructs a like filter.
   *
   * @param field The field to compare against.
   * @param value [optional] The value to match.
   *
   * @return A new filter builder object.
   */
  public static like(field: string, value: any = '%'): BinaryFilterBuilder {
    return new BinaryFilterBuilder(field, value, BinaryOperator.Like);
  }

  private _filter: IBinaryFilter;

  /**
   * Initializes a new instance of this object.
   *
   * @param field The field to use
   */
  private constructor(field: string, value: any, operator: BinaryOperator) {
    this._filter = {
      field,
      value,
      operator
    };
  }

  /**
   * Overrides the value.
   *
   * @param value The value to set.
   *
   * @returns This object.
   */
  public value(value: any): BinaryFilterBuilder {
    this._filter.value = value;
    return this;
  }

  /**
   * Returns a copy of the currently built filter.
   *
   * @returns A copy of the currently built filter.
   */
  public filter() {
    return JSON.parse(JSON.stringify(this._filter));
  }
}
