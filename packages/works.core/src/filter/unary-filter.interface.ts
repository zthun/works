import { ZUnaryOperator } from './unary-operator.enum';

/**
 * Represents a yes/no style filter.
 */
export interface IUnaryFilter {
  /**
   * The field to apply the filter on.
   */
  field: string;
  /**
   * The operator for the filter.
   */
  operator: ZUnaryOperator;
}
