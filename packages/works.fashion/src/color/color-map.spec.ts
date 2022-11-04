/* eslint-disable require-jsdoc */

import { keyBy, mapValues } from 'lodash';
import { ZColor } from './color';
import { ZColorHue } from './color-hue';
import { ZColorMapBuilder, ZColorTintMap } from './color-map';
import { ZColorNone } from './color-none';
import { ZColorPriority } from './color-priority';
import { ZColorSeverity } from './color-severity';
import { ZColorShade } from './color-shade';
import { ZColorTint } from './color-tint';

describe('ZColorMap', () => {
  function createTestTarget() {
    return new ZColorMapBuilder();
  }

  describe('Initial', () => {
    function shouldInitializeFashionColorsTo(expected: string, colors: ZColor[]) {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const map = target.build();
      const tints = Object.values(ZColorTint);
      const actual = colors.every((color) => tints.every((tint) => map[color][tint] === expected));
      // Assert
      expect(actual).toBeTruthy();
    }

    it('should initialize all hues to black', () => {
      shouldInitializeFashionColorsTo('#000', Object.values(ZColorHue));
    });

    it('should initialize transparency to complete opacity', () => {
      shouldInitializeFashionColorsTo('rgba(0, 0, 0, 0)', Object.values(ZColorNone));
    });

    it('should initialize priorities to black', () => {
      shouldInitializeFashionColorsTo('#000', Object.values(ZColorPriority));
    });

    it('should initialize severities to black', () => {
      shouldInitializeFashionColorsTo('#000', Object.values(ZColorSeverity));
    });

    it('should initialize shades of grey and black to black', () => {
      shouldInitializeFashionColorsTo('#000', [ZColorShade.Black, ZColorShade.Grey]);
    });

    it('should initialize white to white', () => {
      shouldInitializeFashionColorsTo('#FFF', [ZColorShade.White]);
    });
  });

  describe('By', () => {
    describe('Model', () => {
      it('should set the entire tint map for a color', () => {
        // Arrange.
        const tints = keyBy(ZColorTint);
        const expected = mapValues(tints, () => '#FF0000') as ZColorTintMap;
        const target = createTestTarget();
        // Act.
        const map = target.model(ZColorHue.Red, expected).build();
        const actual = map[ZColorHue.Red];
        // Assert.
        expect(actual).toEqual(expected);
      });
    });

    describe('Fashion', () => {
      it('should set the color and tint of a fashion target.', () => {
        // Arrange
        const target = createTestTarget();
        const expected = '#00FF00';
        // Act.
        const map = target.fashion(expected, { color: ZColorHue.Green, tint: ZColorTint.T400 }).build();
        const actual = map[ZColorHue.Green][ZColorTint.T400];
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should use the main tint if the fashion tint is falsy.', () => {
        // Arrange
        const target = createTestTarget();
        const expected = '#00FF00';
        // Act.
        const map = target.fashion(expected, { color: ZColorHue.Green }).build();
        const actual = map[ZColorHue.Green][ZColorTint.Main];
        // Assert.
        expect(actual).toEqual(expected);
      });
    });

    describe('Color and Tint', () => {
      it('should set the color and tint of a fashion target.', () => {
        // Arrange
        const target = createTestTarget();
        const expected = '#0000FF';
        // Act.
        const map = target.fashion(expected, ZColorHue.Blue, ZColorTint.T400).build();
        const actual = map[ZColorHue.Blue][ZColorTint.T400];
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should use the main tint if the tint is falsy.', () => {
        // Arrange
        const target = createTestTarget();
        const expected = '#0000FF';
        // Act.
        const map = target.fashion(expected, ZColorHue.Blue).build();
        const actual = map[ZColorHue.Blue][ZColorTint.Main];
        // Assert.
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Copy', () => {
    it('should copy the color map.', () => {
      // Arrange.
      const tints = keyBy(ZColorTint);
      const reds = mapValues(tints, () => '#FF0000') as ZColorTintMap;
      const greens = mapValues(tints, () => '#00FF00') as ZColorTintMap;
      const blues = mapValues(tints, () => '#0000FF') as ZColorTintMap;
      const target = createTestTarget();
      const expected = createTestTarget()
        .model(ZColorHue.Red, reds)
        .model(ZColorHue.Green, greens)
        .model(ZColorHue.Blue, blues)
        .build();
      // Act.
      const actual = target.copy(expected).build();
      // Assert.
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
    });
  });
});
