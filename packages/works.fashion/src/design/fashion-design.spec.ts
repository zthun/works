import { describe, expect, it } from 'vitest';
import { ZFashionBuilder } from '../color/fashion';
import { ZFashionCoordinationBuilder } from '../color/fashion-coordination';
import { ZHue } from '../color/hue';
import { ZPaletteBuilder } from '../color/palette';
import { ZFashionDesignBuilder } from './fashion-design';

describe('ZFashionDesignBuilder', () => {
  function createTestTarget() {
    return new ZFashionDesignBuilder();
  }

  describe('Palette', () => {
    it('should set the palette', () => {
      const expected = new ZPaletteBuilder().crayon(ZHue.Green, 'rgb(0, 255, 0, 0.9)').build();
      expect(createTestTarget().palette(expected).build().palette).toEqual(expected);
    });
  });

  describe('Priority', () => {
    it('should set primary', () => {
      const expected = new ZFashionCoordinationBuilder().build();
      expect(createTestTarget().primary(expected).build().primary).toEqual(expected);
    });

    it('should set secondary', () => {
      const expected = new ZFashionCoordinationBuilder().build();
      expect(createTestTarget().secondary(expected).build().secondary).toEqual(expected);
    });
  });

  describe('Severity', () => {
    it('should set success', () => {
      const expected = new ZFashionCoordinationBuilder().build();
      expect(createTestTarget().success(expected).build().success).toEqual(expected);
    });

    it('should set warning', () => {
      const expected = new ZFashionCoordinationBuilder().build();
      expect(createTestTarget().warning(expected).build().warning).toEqual(expected);
    });

    it('should set error', () => {
      const expected = new ZFashionCoordinationBuilder().build();
      expect(createTestTarget().error(expected).build().error).toEqual(expected);
    });

    it('should set info', () => {
      const expected = new ZFashionCoordinationBuilder().build();
      expect(createTestTarget().info(expected).build().info).toEqual(expected);
    });
  });

  describe('Spectrum', () => {
    it('should set dark', () => {
      const expected = new ZFashionCoordinationBuilder().build();
      expect(createTestTarget().dark(expected).build().dark).toEqual(expected);
    });

    it('should set light', () => {
      const expected = new ZFashionCoordinationBuilder().build();
      expect(createTestTarget().light(expected).build().light).toEqual(expected);
    });
  });

  describe('Copy', () => {
    it('should copy another design', () => {
      const palette = new ZPaletteBuilder().crayon(ZHue.Green, 'rgb(0, 255, 0, 0.9)').build();
      const primary = new ZFashionCoordinationBuilder().contrast(new ZFashionBuilder().white().build()).build();
      const expected = createTestTarget().palette(palette).primary(primary).build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
