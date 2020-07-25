import { IFilter } from './filter.type';
import { LogicOperator } from './logic-operator.enum';

/**
 * Represnets a composite logical filter.
 */
export interface ILogicFilter {
  /**
   * The collection of child clauses.
   */
  clauses: IFilter[];
  /**
   * The operator relationship between the clauses.
   */
  operator: LogicOperator;
}
