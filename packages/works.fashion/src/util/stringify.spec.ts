/* eslint-disable require-jsdoc */
import { IZFashion, ZFashionBuilder } from '../color/fashion';
import { stringify } from './stringify';

describe('Stringify', () => {
  function shouldReturnString(expected: string, fashion: IZFashion | null | undefined) {
    // Arrange.
    // Act.
    const actual = stringify(fashion);
    // Assert.
    expect(actual).toEqual(expected);
  }

  it('should return the shade of a fashion hue', () => {
    shouldReturnString('Red [600]', new ZFashionBuilder().red(600).build());
  });

  it('should return the hue only if the hue is inherit', () => {
    shouldReturnString('Inherit', new ZFashionBuilder().inherit().build());
  });

  it('should return Transparent if the hue is null', () => {
    shouldReturnString('Transparent', new ZFashionBuilder().transparent().build());
  });

  it('should return the empty string for null', () => {
    shouldReturnString('', null);
  });

  it('should return the empty string for undefined', () => {
    shouldReturnString('', undefined);
  });
});
