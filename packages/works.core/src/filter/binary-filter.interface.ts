import { ZBinaryOperator } from './binary-operator.enum';

/**
 * Represents a standard comparison filter between a field and a wanted value.
 */
export interface IZBinaryFilter<T = any> {
  /**
   * The filed to sort by.
   */
  field: string;
  /**
   * The comparison operator.
   */
  operator: ZBinaryOperator;
  /**
   * The value to sort by.
   */
  value: T;
}
