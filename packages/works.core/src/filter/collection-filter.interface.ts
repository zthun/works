import { ZCollectionOperator } from './collection-operator.enum';

/**
 * A filter that operates on a collection of values.
 */
export interface IZCollectionFilter<T = any> {
  /**
   * The collection field.
   */
  field: string;
  /**
   * The collection operator against the field.
   */
  operator: ZCollectionOperator;
  /**
   * The values to compare the field against.
   */
  values: T[];
}
