import { UnaryFilterBuilder } from './unary-filter-builder.class';
import { IUnaryFilter } from './unary-filter.interface';
import { ZUnaryOperator } from './unary-operator.enum';

describe('UnaryFilterBuilder', () => {
  let field: string;

  function assertPropertySet<T>(expected: T, build: () => UnaryFilterBuilder, actual: (f: IUnaryFilter) => T) {
    // Arrange
    const target = build();
    // Act
    const val = actual(target.filter());
    // Assert
    expect(JSON.stringify(val)).toEqual(JSON.stringify(expected));
  }

  beforeEach(() => {
    field = 'name';
  });

  describe('IsNull', () => {
    it('sets the field.', () => {
      assertPropertySet(
        field,
        () => UnaryFilterBuilder.isNull(field),
        (f) => f.field
      );
    });

    it('sets the operator.', () => {
      assertPropertySet(
        ZUnaryOperator.IsNull,
        () => UnaryFilterBuilder.isNull(field),
        (f) => f.operator
      );
    });
  });

  describe('IsNotNull', () => {
    it('sets the field.', () => {
      assertPropertySet(
        field,
        () => UnaryFilterBuilder.isNotNull(field),
        (f) => f.field
      );
    });

    it('sets the operator.', () => {
      assertPropertySet(
        ZUnaryOperator.IsNotNull,
        () => UnaryFilterBuilder.isNotNull(field),
        (f) => f.operator
      );
    });
  });
});
