import { describe, expect, it } from 'vitest';
import { ZUnaryFilterBuilder, ZUnaryOperator } from './unary-filter';

describe('UnaryFilterBuilder', () => {
  function createTestTarget() {
    return new ZUnaryFilterBuilder();
  }

  it('sets the field.', () => {
    const expected = 'field';
    expect(createTestTarget().field(expected).build().field).toEqual(expected);
  });

  it('sets the operator to is null.', () => {
    expect(createTestTarget().field('a').isNull().build().operator).toEqual(ZUnaryOperator.IsNull);
  });

  it('sets the operator to is not null.', () => {
    expect(createTestTarget().field('a').isNotNull().build().operator).toEqual(ZUnaryOperator.IsNotNull);
  });
});
