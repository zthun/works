/* eslint-disable require-jsdoc */
import { ZCollectionFilterBuilder, ZCollectionOperator } from './collection-filter';

describe('CollectionFilterBuilder', () => {
  function createTestTarget() {
    return new ZCollectionFilterBuilder();
  }

  it('sets the field.', () => {
    const expected = 'field';
    expect(createTestTarget().field(expected).build().field).toEqual(expected);
  });

  it('sets the values.', () => {
    const expected = [1, 2, 3, 4];
    expect(createTestTarget().values(expected).build().values).toEqual(expected);
  });

  it('incrementally adds values.', () => {
    const expected = [1, 2, 3, 4];
    expect(createTestTarget().value(1).value(2).value(3).value(4).build().values).toEqual(expected);
  });

  it('sets the operator to in.', () => {
    expect(createTestTarget().in().build().operator).toEqual(ZCollectionOperator.In);
  });

  it('sets the operator to not in.', () => {
    expect(createTestTarget().notIn().build().operator).toEqual(ZCollectionOperator.NotIn);
  });
});
