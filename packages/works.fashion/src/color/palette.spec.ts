/* eslint-disable require-jsdoc */

import { keyBy, mapValues } from 'lodash';
import { ZFashionBuilder } from './fashion';
import { ZHue } from './hue';
import { ZPaletteBuilder } from './palette';
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
    describe('Shade', () => {
      it('should set the entire shade for a color', () => {
        const expected = mapValues(keyBy(ZShades), () => '#FF0000') as Record<ZShade, string>;
        expect(createTestTarget().gradient(ZHue.Red, expected).build().red).toEqual(expected);
      });
    });

    describe('Fashion', () => {
      it('should set the color and shade of a fashion target.', () => {
        const expected = '#00FF00';
        const actual = createTestTarget().fashion(expected, new ZFashionBuilder().green(700).build()).build();
        expect(actual.green[700]).toEqual(expected);
      });

      it('should throw an Error if the fashion target is transparent.', () => {
        const actual = () => createTestTarget().fashion('#000000', new ZFashionBuilder().transparent().build());
        expect(actual).toThrowError();
      });
    });
  });

  describe('Copy', () => {
    it('should copy the color map.', () => {
      const expected = createTestTarget().crayon(ZHue.Orange, '#123456').build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
