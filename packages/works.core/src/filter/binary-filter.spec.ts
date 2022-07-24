/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { IZBinaryFilter, ZBinaryFilterBuilder, ZBinaryOperator } from './binary-filter';

describe('BinaryFilterBuilder', () => {
  function createTestTarget() {
    return new ZBinaryFilterBuilder();
  }

  it('sets the field.', () => {
    assertBuilderSetsProperty(
      'field',
      createTestTarget,
      (t, v) => t.field(v).equal().value('value'),
      (f: IZBinaryFilter) => f.field
    );
  });

  it('sets the value.', () => {
    assertBuilderSetsProperty(
      'value',
      createTestTarget,
      (t, v) => t.field('field').equal().value(v),
      (f: IZBinaryFilter) => f.value
    );
  });

  it('sets the operator to equal.', () => {
    assertBuilderSetsProperty(
      ZBinaryOperator.Equal,
      createTestTarget,
      (t) => t.field('field').equal().value('value'),
      (f: IZBinaryFilter) => f.operator
    );
  });

  it('sets the operator to not equal.', () => {
    assertBuilderSetsProperty(
      ZBinaryOperator.NotEqual,
      createTestTarget,
      (t) => t.field('field').notEqual().value('value'),
      (f: IZBinaryFilter) => f.operator
    );
  });

  it('sets the operator to greater than.', () => {
    assertBuilderSetsProperty(
      ZBinaryOperator.GreaterThan,
      createTestTarget,
      (t) => t.field('field').greaterThan().value('value'),
      (f: IZBinaryFilter) => f.operator
    );
  });

  it('sets the operator to greater than equal to.', () => {
    assertBuilderSetsProperty(
      ZBinaryOperator.GreaterThanEqualTo,
      createTestTarget,
      (t) => t.field('field').greaterThanEqualTo().value('value'),
      (f: IZBinaryFilter) => f.operator
    );
  });

  it('sets the operator to less than.', () => {
    assertBuilderSetsProperty(
      ZBinaryOperator.LessThan,
      createTestTarget,
      (t) => t.field('field').lessThan().value('value'),
      (f: IZBinaryFilter) => f.operator
    );
  });

  it('sets the operator to less than equal to.', () => {
    assertBuilderSetsProperty(
      ZBinaryOperator.LessThanEqualTo,
      createTestTarget,
      (t) => t.field('field').lessThanEqualTo().value('value'),
      (f: IZBinaryFilter) => f.operator
    );
  });

  it('sets the operator to like.', () => {
    assertBuilderSetsProperty(
      ZBinaryOperator.Like,
      createTestTarget,
      (t) => t.field('field').like().value('value'),
      (f: IZBinaryFilter) => f.operator
    );
  });
});
