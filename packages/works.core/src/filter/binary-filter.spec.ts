/* eslint-disable require-jsdoc */
import { ZBinaryFilterBuilder, ZBinaryOperator } from './binary-filter';

describe('BinaryFilterBuilder', () => {
  function createTestTarget() {
    return new ZBinaryFilterBuilder();
  }

  it('sets the field.', () => {
    const expected = 'field';
    expect(createTestTarget().field(expected).build().field).toEqual(expected);
  });

  it('sets the value.', () => {
    const expected = 'value';
    expect(createTestTarget().value(expected).build().value).toEqual(expected);
  });

  it('sets the operator to equal.', () => {
    expect(createTestTarget().equal().build().operator).toEqual(ZBinaryOperator.Equal);
  });

  it('sets the operator to not equal.', () => {
    expect(createTestTarget().notEqual().build().operator).toEqual(ZBinaryOperator.NotEqual);
  });

  it('sets the operator to greater than.', () => {
    expect(createTestTarget().greaterThan().build().operator).toEqual(ZBinaryOperator.GreaterThan);
  });

  it('sets the operator to greater than equal to.', () => {
    expect(createTestTarget().greaterThanEqualTo().build().operator).toEqual(ZBinaryOperator.GreaterThanEqualTo);
  });

  it('sets the operator to less than.', () => {
    expect(createTestTarget().lessThan().build().operator).toEqual(ZBinaryOperator.LessThan);
  });

  it('sets the operator to less than equal to.', () => {
    expect(createTestTarget().lessThanEqualTo().build().operator).toEqual(ZBinaryOperator.LessThanEqualTo);
  });

  it('sets the operator to like.', () => {
    expect(createTestTarget().like().build().operator).toEqual(ZBinaryOperator.Like);
  });
});
