import { BinaryFilterBuilder } from './binary-filter-builder.class';
import { CollectionFilterBuilder } from './collection-filter-builder.class';
import { IFilter } from './filter.type';
import { LogicFilterBuilder } from './logic-filter-builder.class';
import { ILogicFilter } from './logic-filter.interface';
import { LogicOperator } from './logic-operator.enum';
import { ZUnaryFilterBuilder } from './unary-filter-builder.class';

describe('LogicFilterBuilder', () => {
  let clauseA: IFilter;
  let clauseB: IFilter;
  let clauseC: IFilter;
  let clauseD: IFilter;

  function assertPropertySet<T>(expected: T, build: () => LogicFilterBuilder, actual: (t: ILogicFilter) => T) {
    // Arrange
    const target = build();
    // Act
    const val = actual(target.filter());
    // Assert
    expect(JSON.stringify(val)).toEqual(JSON.stringify(expected));
  }

  beforeEach(() => {
    clauseA = BinaryFilterBuilder.greaterThan('age', 2).filter();
    clauseB = BinaryFilterBuilder.lessThan('age', 10).filter();
    clauseC = ZUnaryFilterBuilder.isNull('collection').filter();
    clauseD = CollectionFilterBuilder.in('state').value('Texas').value('Arizona').filter();
  });

  describe('And', () => {
    it('sets the clauses.', () => {
      const expected = [clauseA, clauseB, clauseC, clauseD];
      assertPropertySet(
        expected,
        () => LogicFilterBuilder.and(clauseA, clauseB, clauseC).another(clauseD),
        (f) => f.clauses
      );
    });

    it('sets the operator.', () => {
      assertPropertySet(
        LogicOperator.And,
        () => LogicFilterBuilder.and(clauseA, clauseB),
        (f) => f.operator
      );
    });
  });

  describe('Or', () => {
    it('sets the clauses.', () => {
      const expected = [clauseA, clauseB, clauseC, clauseD];
      assertPropertySet(
        expected,
        () => LogicFilterBuilder.or(clauseA, clauseB, clauseC).another(clauseD),
        (f) => f.clauses
      );
    });

    it('sets the operator.', () => {
      assertPropertySet(
        LogicOperator.Or,
        () => LogicFilterBuilder.or(clauseA, clauseB),
        (f) => f.operator
      );
    });
  });
});
