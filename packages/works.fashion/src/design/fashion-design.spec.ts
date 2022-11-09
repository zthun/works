/* eslint-disable require-jsdoc */

import { assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZFashionBuilder } from '../color/fashion';
import { ZFashionCoordinationBuilder } from '../color/fashion-coordination';
import { ZHue } from '../color/hue';
import { ZPaletteBuilder } from '../color/palette';
import { IZFashionDesign, ZFashionDesignBuilder } from './fashion-design';

describe('ZFashionDesignBuilder', () => {
  function createTestTarget() {
    return new ZFashionDesignBuilder();
  }

  describe('Palette', () => {
    it('should set the palette', () => {
      assertBuilderSetsProperty(
        new ZPaletteBuilder().crayon(ZHue.Green, 'rgb(0, 255, 0, 0.9)').build(),
        createTestTarget,
        (t, v) => t.palette(v),
        (d: IZFashionDesign) => d.palette
      );
    });
  });

  describe('Priority', () => {
    it('should set primary', () => {
      assertBuilderSetsProperty(
        new ZFashionCoordinationBuilder().build(),
        createTestTarget,
        (t, v) => t.primary(v),
        (d: IZFashionDesign) => d.primary
      );
    });

    it('should set secondary', () => {
      assertBuilderSetsProperty(
        new ZFashionCoordinationBuilder().build(),
        createTestTarget,
        (t, v) => t.secondary(v),
        (d: IZFashionDesign) => d.secondary
      );
    });
  });

  describe('Severity', () => {
    it('should set success', () => {
      assertBuilderSetsProperty(
        new ZFashionCoordinationBuilder().build(),
        createTestTarget,
        (t, v) => t.success(v),
        (d: IZFashionDesign) => d.success
      );
    });

    it('should set warning', () => {
      assertBuilderSetsProperty(
        new ZFashionCoordinationBuilder().build(),
        createTestTarget,
        (t, v) => t.warning(v),
        (d: IZFashionDesign) => d.warning
      );
    });

    it('should set error', () => {
      assertBuilderSetsProperty(
        new ZFashionCoordinationBuilder().build(),
        createTestTarget,
        (t, v) => t.error(v),
        (d: IZFashionDesign) => d.error
      );
    });

    it('should set info', () => {
      assertBuilderSetsProperty(
        new ZFashionCoordinationBuilder().build(),
        createTestTarget,
        (t, v) => t.info(v),
        (d: IZFashionDesign) => d.info
      );
    });
  });

  describe('Spectrum', () => {
    it('should set dark', () => {
      assertBuilderSetsProperty(
        new ZFashionCoordinationBuilder().build(),
        createTestTarget,
        (t, v) => t.dark(v),
        (d: IZFashionDesign) => d.dark
      );
    });

    it('should set light', () => {
      assertBuilderSetsProperty(
        new ZFashionCoordinationBuilder().build(),
        createTestTarget,
        (t, v) => t.light(v),
        (d: IZFashionDesign) => d.light
      );
    });
  });

  describe('Copy', () => {
    it('should copy another design', () => {
      const palette = new ZPaletteBuilder().crayon(ZHue.Green, 'rgb(0, 255, 0, 0.9)').build();
      const primary = new ZFashionCoordinationBuilder().contrast(new ZFashionBuilder().white().build()).build();
      assertBuilderCopiesObject(createTestTarget().palette(palette).primary(primary).build(), createTestTarget);
    });
  });
});
