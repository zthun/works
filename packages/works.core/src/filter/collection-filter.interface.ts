import { CollectionOperator } from './collection-operator.enum';

/**
 * A filter that operates on a collection of values.
 */
export interface ICollectionFilter {
  /**
   * The collection field.
   */
  field: string;
  /**
   * The collection operator against the field.
   */
  operator: CollectionOperator;
  /**
   * The values to compare the field against.
   */
  values: any[];
}
