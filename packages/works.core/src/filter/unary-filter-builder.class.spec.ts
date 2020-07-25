import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZUnaryFilterBuilder } from './unary-filter-builder.class';
import { ZUnaryOperator } from './unary-operator.enum';
import { IZUnaryFilter } from './unary-filter.interface';

describe('UnaryFilterBuilder', () => {
  function createTestTarget() {
    return new ZUnaryFilterBuilder();
  }
  it('sets the field.', () => {
    assertBuilderSetsProperty(
      'field',
      createTestTarget,
      (t, v) => t.field(v).isNull(),
      (f: IZUnaryFilter) => f.field
    );
  });

  it('sets the operator to is null.', () => {
    assertBuilderSetsProperty(
      ZUnaryOperator.IsNull,
      createTestTarget,
      (t) => t.field('a').isNull(),
      (f: IZUnaryFilter) => f.operator
    );
  });

  it('sets the operator to is not null.', () => {
    assertBuilderSetsProperty(
      ZUnaryOperator.IsNotNull,
      createTestTarget,
      (t) => t.field('a').isNotNull(),
      (f: IZUnaryFilter) => f.operator
    );
  });
});
