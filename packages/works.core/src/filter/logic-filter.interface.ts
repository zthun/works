import { IZFilter } from './filter.type';
import { ZLogicOperator } from './logic-operator.enum';

/**
 * Represents a composite logical filter.
 */
export interface IZLogicFilter {
  /**
   * The collection of child clauses.
   */
  clauses: IZFilter[];
  /**
   * The operator relationship between the clauses.
   */
  operator: ZLogicOperator;
}
