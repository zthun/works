/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZBinaryFilterBuilder } from './binary-filter';
import { ZCollectionFilterBuilder } from './collection-filter';
import { IZFilter } from './filter';
import { IZLogicFilter, ZLogicFilterBuilder, ZLogicOperator } from './logic-filter';
import { ZUnaryFilterBuilder } from './unary-filter';

describe('LogicFilterBuilder', () => {
  let clauseA: IZFilter;
  let clauseB: IZFilter;
  let clauseC: IZFilter;
  let clauseD: IZFilter;

  function createTestTarget() {
    return new ZLogicFilterBuilder();
  }

  beforeEach(() => {
    clauseA = new ZBinaryFilterBuilder().field('age').greaterThan().value(2).build();
    clauseB = new ZBinaryFilterBuilder().field('age').lessThan().value(10).build();
    clauseC = new ZUnaryFilterBuilder().field('collection').isNull().build();
    clauseD = new ZCollectionFilterBuilder().field('state').in().value('Texas').value('Arizona').build();
  });

  it('sets the clauses.', () => {
    assertBuilderSetsProperty(
      [clauseA, clauseB, clauseC, clauseD],
      createTestTarget,
      (t, v) => t.and().clauses(v),
      (f: IZLogicFilter) => f.clauses
    );
  });

  it('adds clauses.', () => {
    assertBuilderSetsProperty(
      [clauseA, clauseB, clauseC, clauseD],
      createTestTarget,
      (t) => t.clause(clauseA).clause(clauseB).clause(clauseC).clause(clauseD),
      (f: IZLogicFilter) => f.clauses
    );
  });

  it('sets the operator to and.', () => {
    assertBuilderSetsProperty(
      ZLogicOperator.And,
      createTestTarget,
      (t) => t.and().clause(clauseA).clause(clauseB),
      (f: IZLogicFilter) => f.operator
    );
  });

  it('sets the operator to or.', () => {
    assertBuilderSetsProperty(
      ZLogicOperator.Or,
      createTestTarget,
      (t) => t.or().clause(clauseA).clause(clauseB),
      (f: IZLogicFilter) => f.operator
    );
  });
});
