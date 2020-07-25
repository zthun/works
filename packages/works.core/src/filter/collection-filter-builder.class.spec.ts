import { CollectionFilterBuilder } from './collection-filter-builder.class';
import { ICollectionFilter } from './collection-filter.interface';
import { CollectionOperator } from './collection-operator.enum';

describe('CollectionFilterBuilder', () => {
  let field: string;

  function assertPropertySet<T>(expected: T, build: () => CollectionFilterBuilder, actual: (t: ICollectionFilter) => T) {
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

  describe('In', () => {
    it('sets the field.', () => {
      assertPropertySet(field, () => CollectionFilterBuilder.in(field), (f) => f.field);
    });

    it('sets the values.', () => {
      const expected = [1, 2, 3, 4];
      assertPropertySet(expected, () => CollectionFilterBuilder.in(field, [8, 9]).values(expected), (f) => f.values);
    });

    it('incrementally adds values.', () => {
      const expected = [1, 2, 3, 4];
      assertPropertySet(expected, () => CollectionFilterBuilder.in(field, [1, 2]).value(3).value(4), (f) => f.values);
    });

    it('sets the operator.', () => {
      assertPropertySet(CollectionOperator.In, () => CollectionFilterBuilder.in(field), (f) => f.operator);
    });
  });

  describe('Not In', () => {
    it('sets the field.', () => {
      assertPropertySet(field, () => CollectionFilterBuilder.notIn(field), (f) => f.field);
    });

    it('sets the values.', () => {
      const expected = [1, 2, 3, 4];
      assertPropertySet(expected, () => CollectionFilterBuilder.notIn(field, [8, 9]).values(expected), (f) => f.values);
    });

    it('incrementally adds values.', () => {
      const expected = [1, 2, 3, 4];
      assertPropertySet(expected, () => CollectionFilterBuilder.notIn(field, [1, 2]).value(3).value(4), (f) => f.values);
    });

    it('sets the operator.', () => {
      assertPropertySet(CollectionOperator.NotIn, () => CollectionFilterBuilder.notIn(field), (f) => f.operator);
    });
  });
});
