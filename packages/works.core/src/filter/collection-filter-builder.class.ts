import { ICollectionFilter } from './collection-filter.interface';
import { CollectionOperator } from './collection-operator.enum';

/**
 * Represents a builder for a collection filter.
 */
export class CollectionFilterBuilder {
  /**
   * Constructs an in filter.
   *
   * @param field The field to compare against.
   * @param values [optional] The starting values.
   *
   * @return The builder object.
   */
  public static in(field: string, values: any[] = []): CollectionFilterBuilder {
    return new CollectionFilterBuilder(field, CollectionOperator.In).values(values);
  }

  /**
   * Constructs a not in filter.
   *
   * @param field The field to compare against.
   * @param values [optional] The starting values.
   *
   * @return The builder object.
   */
  public static notIn(field: string, values: any[] = []): CollectionFilterBuilder {
    return new CollectionFilterBuilder(field, CollectionOperator.NotIn).values(values);
  }

  private _filter: ICollectionFilter;

  /**
   * Initializes a new instance of this object.
   *
   * @param field The filed to which the filter applies.
   */
  private constructor(field: string, operator: CollectionOperator) {
    this._filter = {
      field,
      operator,
      values: []
    };
  }

  /**
   * Sets all of the values.
   *
   * @param values The collection of values.
   *
   * @returns This object.
   */
  public values(values: any[]): CollectionFilterBuilder {
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
  public value(value: any): CollectionFilterBuilder {
    this._filter.values.push(value);
    return this;
  }

  /**
   * Returns a copy of the constructed filter.
   *
   * @returns A copy of the currently built filter.
   */
  public filter(): ICollectionFilter {
    return JSON.parse(JSON.stringify(this._filter));
  }
}
