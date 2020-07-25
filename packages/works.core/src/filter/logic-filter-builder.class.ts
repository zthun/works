import { IFilter } from './filter.type';
import { ILogicFilter } from './logic-filter.interface';
import { LogicOperator } from './logic-operator.enum';

/**
 * Represents a builder for a logic filter.
 */
export class LogicFilterBuilder {
  /**
   * Constructs a logic filter with an 'and' clause.
   *
   * @param clauseA The first required clause.
   * @param clauseB The second required clause.
   * @param more Optional remaining clauses.
   *
   * @return A new filter builder.
   */
  public static and(clauseA: IFilter, clauseB: IFilter, ...more: IFilter[]): LogicFilterBuilder {
    return new LogicFilterBuilder([clauseA, clauseB, ...more], LogicOperator.And);
  }

  /**
   * Constructs a logic filter with an 'or' clause.
   *
   * @param clauseA The first required clause.
   * @param clauseB The second required clause.
   * @param more Optional remaining clauses.
   *
   * @return A new filter builder.
   */
  public static or(clauseA: IFilter, clauseB: IFilter, ...more: IFilter[]): LogicFilterBuilder {
    return new LogicFilterBuilder([clauseA, clauseB, ...more], LogicOperator.Or);
  }

  private _filter: ILogicFilter;

  /**
   * Initializes a new instance of this objecjt.
   *
   * @param clauses The list of logical clauses.
   * @param operator The operator relationship.
   */
  private constructor(clauses: IFilter[], operator: LogicOperator) {
    this._filter = {
      clauses,
      operator
    };
  }

  /**
   * Adds another clause.
   *
   * @param clause The clause to add.
   *
   * @return This object.
   */
  public another(clause: IFilter): LogicFilterBuilder {
    this._filter.clauses.push(clause);
    return this;
  }

  /**
   * Returns the filter.
   *
   * @returns The logic filter
   */
  public filter(): ILogicFilter {
    return JSON.parse(JSON.stringify(this._filter));
  }
}
