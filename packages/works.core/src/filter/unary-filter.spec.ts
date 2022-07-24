/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { IZUnaryFilter, ZUnaryFilterBuilder, ZUnaryOperator } from './unary-filter';

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
