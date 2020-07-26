import { ZCollectionFilterBuilder } from './collection-filter-builder.class';
import { IZCollectionFilter } from './collection-filter.interface';
import { ZCollectionOperator } from './collection-operator.enum';
import { assertBuilderSetsProperty } from '@zthun/works.jest';

describe('CollectionFilterBuilder', () => {
  function createTestTarget() {
    return new ZCollectionFilterBuilder();
  }

  it('sets the field.', () => {
    assertBuilderSetsProperty(
      'field',
      createTestTarget,
      (t, v) => t.field(v),
      (f: IZCollectionFilter) => f.field
    );
  });

  it('sets the values.', () => {
    assertBuilderSetsProperty(
      [1, 2, 3, 4],
      createTestTarget,
      (t, v) => t.values(v),
      (f: IZCollectionFilter) => f.values
    );
  });

  it('incrementally adds values.', () => {
    assertBuilderSetsProperty(
      [1, 2, 3, 4],
      createTestTarget,
      (t) => t.value(1).value(2).value(3).value(4),
      (f: IZCollectionFilter) => f.values
    );
  });

  it('sets the operator to in.', () => {
    assertBuilderSetsProperty(
      ZCollectionOperator.In,
      createTestTarget,
      (t) => t.field('a').in().value(1).value(2),
      (f: IZCollectionFilter) => f.operator
    );
  });

  it('sets the operator to not in.', () => {
    assertBuilderSetsProperty(
      ZCollectionOperator.NotIn,
      createTestTarget,
      (t) => t.field('a').notIn().value(1).value(2),
      (f: IZCollectionFilter) => f.operator
    );
  });
});
