import { beforeEach, describe, expect, it } from 'vitest';
import { ZBinaryFilterBuilder } from './binary-filter';
import { ZCollectionFilterBuilder } from './collection-filter';
import { IZFilter } from './filter';
import { ZLogicFilterBuilder, ZLogicOperator } from './logic-filter';
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
    const expected = [clauseA, clauseB, clauseC, clauseD];
    expect(createTestTarget().clauses(expected).build().clauses).toEqual(expected);
  });

  it('adds clauses.', () => {
    const expected = [clauseA, clauseB, clauseC, clauseD];
    const actual = createTestTarget().clause(clauseA).clause(clauseB).clause(clauseC).clause(clauseD).build().clauses;
    expect(actual).toEqual(expected);
  });

  it('sets the operator to and.', () => {
    expect(createTestTarget().and().clause(clauseA).clause(clauseB).build().operator).toEqual(ZLogicOperator.And);
  });

  it('sets the operator to or.', () => {
    expect(createTestTarget().or().clause(clauseA).clause(clauseB).build().operator).toEqual(ZLogicOperator.Or);
  });
});
