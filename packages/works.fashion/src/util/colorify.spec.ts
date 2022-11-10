import { ZFashionBuilder } from '../color/fashion';
import { ZPaletteBuilder } from '../color/palette';
import { colorify, ZCssTransparent } from './colorify';

describe('Colorify', () => {
  it('should return the rgb string for transparency if the fashion represents transparency', () => {
    // Arrange.
    const fashion = new ZFashionBuilder().transparent().build();
    // Act.
    const actual = colorify(new ZPaletteBuilder().build(), fashion);
    // Assert.
    expect(actual).toEqual(ZCssTransparent);
  });

  it('should render inherit if the fashion represents inherit', () => {
    // Arrange.
    const fashion = new ZFashionBuilder().inherit().build();
    // Act.
    const actual = colorify(new ZPaletteBuilder().build(), fashion);
    // Assert.
    expect(actual).toEqual('inherit');
  });

  it('should return the targeted color', () => {
    // Arrange.
    const expected = '#999999';
    const fashion = new ZFashionBuilder().grey(400).build();
    const palette = new ZPaletteBuilder().fashion(expected, fashion).build();
    // Act.
    const actual = colorify(palette, fashion);
    // Assert.
    expect(actual).toEqual(expected);
  });
});
