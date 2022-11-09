/* eslint-disable require-jsdoc */

import { assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { keyBy, mapValues } from 'lodash';
import { ZFashionBuilder } from './fashion';
import { ZHue } from './hue';
import { IZPalette, ZPaletteBuilder } from './palette';
import { ZShade, ZShades } from './shade';

describe('ZPalette', () => {
  function createTestTarget() {
    return new ZPaletteBuilder();
  }

  describe('Initial', () => {
    it('should initialize all hues', () => {
      // Arrange.
      const hues = Object.values(ZHue);
      const target = createTestTarget();
      // Act.
      const palette = target.build();
      const hasAllColors = hues.every((color) => Object.prototype.hasOwnProperty.call(palette, color));
      // Assert.
      expect(hasAllColors).toBeTruthy();
    });

    it('should initialize all shades for every hue', () => {
      // Arrange.
      const hues = Object.values(ZHue);
      const target = createTestTarget();
      // Act.
      const palette = target.build();
      const hasAllShades = hues.every((color) => ZShades.every((shade) => !!palette[color][shade]));
      // Assert.
      expect(hasAllShades).toBeTruthy();
    });
  });

  describe('By', () => {
    describe('Luminance', () => {
      it('should set the entire luminance for a color', () => {
        assertBuilderSetsProperty(
          mapValues(keyBy(ZShades), () => '#FF0000') as Record<ZShade, string>,
          createTestTarget,
          (t, v) => t.gradient(ZHue.Red, v),
          (p: IZPalette) => p.red
        );
      });
    });

    describe('Fashion', () => {
      it('should set the color and shade of a fashion target.', () => {
        assertBuilderSetsProperty(
          '#00FF00',
          createTestTarget,
          (t, v) => t.fashion(v, new ZFashionBuilder().green(700).build()),
          (p: IZPalette) => p.green[700]
        );
      });

      it('should throw an Error if the fashion target is transparent.', () => {
        // Arrange
        const target = createTestTarget();
        // Act.
        const actual = () => target.fashion('#000000', new ZFashionBuilder().transparent().build());
        // Assert.
        expect(actual).toThrowError();
      });
    });
  });

  describe('Copy', () => {
    it('should copy the color map.', () => {
      const other = createTestTarget().crayon(ZHue.Orange, '#123456').build();
      assertBuilderCopiesObject(other, createTestTarget);
    });
  });
});
