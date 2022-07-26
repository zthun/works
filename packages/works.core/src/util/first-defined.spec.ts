import { firstDefined } from './first-defined';

describe('FirstDefined', () => {
  it('should return the first value if it is defined.', () => {
    // Arrange
    const expected = 'test-2';
    // Act
    const actual = firstDefined('test', expected);
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should return the first defined value.', () => {
    // Arrange
    const expected = 'test-last';
    // Act.
    const actual = firstDefined('test', null, undefined, null, expected, null);
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should return the fallback in the case that everything is not defined.', () => {
    // Arrange.
    const expected = 'fallback';
    // Act.
    const actual = firstDefined(expected, null, undefined, null, undefined);
    // Assert.
    expect(actual).toEqual(expected);
  });
});
