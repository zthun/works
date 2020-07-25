import { BinaryFilterBuilder } from './binary-filter-builder.class';
import { IBinaryFilter } from './binary-filter.interface';
import { BinaryOperator } from './binary-operator.enum';

describe('BinaryFilterBuilder', () => {
  let field: string;
  let value: string;

  beforeEach(() => {
    field = 'name';
    value = 'value';
  });

  function assertProperty<T>(expected: T, build: () => BinaryFilterBuilder, actual: (f: IBinaryFilter) => T) {
    // Arrange
    const target = build();
    // Act
    const val = actual(target.filter());
    // Assert
    expect(JSON.stringify(val)).toEqual(JSON.stringify(expected));
  }

  describe('Equal', () => {
    it('sets the field.', () => {
      assertProperty(field, () => BinaryFilterBuilder.equal(field, value), (f) => f.field);
    });

    it('sets the value.', () => {
      assertProperty(value, () => BinaryFilterBuilder.equal(field, value), (f) => f.value);
    });

    it('overrides the value.', () => {
      assertProperty(value, () => BinaryFilterBuilder.equal(field).value(value), (f) => f.value);
    });

    it('sets the operator.', () => {
      assertProperty(BinaryOperator.Equal, () => BinaryFilterBuilder.equal(field), (f) => f.operator);
    });
  });

  describe('Not Equal', () => {
    it('sets the field.', () => {
      assertProperty(field, () => BinaryFilterBuilder.notEqual(field, value), (f) => f.field);
    });

    it('sets the value.', () => {
      assertProperty(value, () => BinaryFilterBuilder.notEqual(field, value), (f) => f.value);
    });

    it('overrides the value.', () => {
      assertProperty(value, () => BinaryFilterBuilder.notEqual(field).value(value), (f) => f.value);
    });

    it('sets the operator.', () => {
      assertProperty(BinaryOperator.NotEqual, () => BinaryFilterBuilder.notEqual(field), (f) => f.operator);
    });
  });

  describe('Less Than', () => {
    it('sets the field.', () => {
      assertProperty(field, () => BinaryFilterBuilder.lessThan(field, value), (f) => f.field);
    });

    it('sets the value.', () => {
      assertProperty(value, () => BinaryFilterBuilder.lessThan(field, value), (f) => f.value);
    });

    it('overrides the value.', () => {
      assertProperty(value, () => BinaryFilterBuilder.lessThan(field).value(value), (f) => f.value);
    });

    it('sets the operator.', () => {
      assertProperty(BinaryOperator.LessThan, () => BinaryFilterBuilder.lessThan(field), (f) => f.operator);
    });

    describe('Greater Than', () => {
      it('sets the field.', () => {
        assertProperty(field, () => BinaryFilterBuilder.greaterThan(field, value), (f) => f.field);
      });

      it('sets the value.', () => {
        assertProperty(value, () => BinaryFilterBuilder.greaterThan(field, value), (f) => f.value);
      });

      it('overrides the value.', () => {
        assertProperty(value, () => BinaryFilterBuilder.greaterThan(field).value(value), (f) => f.value);
      });

      it('sets the operator.', () => {
        assertProperty(BinaryOperator.GreaterThan, () => BinaryFilterBuilder.greaterThan(field), (f) => f.operator);
      });
    });

    describe('Less Than Or Equal To', () => {
      it('sets the field.', () => {
        assertProperty(field, () => BinaryFilterBuilder.lessThanEqualTo(field, value), (f) => f.field);
      });

      it('sets the value.', () => {
        assertProperty(value, () => BinaryFilterBuilder.lessThanEqualTo(field, value), (f) => f.value);
      });

      it('overrides the value.', () => {
        assertProperty(value, () => BinaryFilterBuilder.lessThanEqualTo(field).value(value), (f) => f.value);
      });

      it('sets the operator.', () => {
        assertProperty(BinaryOperator.LessThanEqualTo, () => BinaryFilterBuilder.lessThanEqualTo(field), (f) => f.operator);
      });
    });

    describe('Greater Than Or Equal To', () => {
      it('sets the field.', () => {
        assertProperty(field, () => BinaryFilterBuilder.greaterThanEqualTo(field, value), (f) => f.field);
      });

      it('sets the value.', () => {
        assertProperty(value, () => BinaryFilterBuilder.greaterThanEqualTo(field, value), (f) => f.value);
      });

      it('overrides the value.', () => {
        assertProperty(value, () => BinaryFilterBuilder.greaterThanEqualTo(field).value(value), (f) => f.value);
      });

      it('sets the operator.', () => {
        assertProperty(BinaryOperator.GreaterThanEqualTo, () => BinaryFilterBuilder.greaterThanEqualTo(field), (f) => f.operator);
      });
    });

    describe('Like', () => {
      it('sets the field.', () => {
        assertProperty(field, () => BinaryFilterBuilder.like(field, value), (f) => f.field);
      });

      it('sets the value.', () => {
        assertProperty(value, () => BinaryFilterBuilder.like(field, value), (f) => f.value);
      });

      it('overrides the value.', () => {
        assertProperty(value, () => BinaryFilterBuilder.like(field).value(value), (f) => f.value);
      });

      it('sets the operator.', () => {
        assertProperty(BinaryOperator.Like, () => BinaryFilterBuilder.like(field), (f) => f.operator);
      });
    });
  });
});
