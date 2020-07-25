import { BinaryOperator } from './binary-operator.enum';

/**
 * Represents a standard comparison filter between a field and a wanted value.
 */
export interface IBinaryFilter {
  /**
   * The filed to sort by.
   */
  field: string;
  /**
   * The comparison operator.
   */
  operator: BinaryOperator;
  /**
   * The value to sort by.
   */
  value: any;
}
