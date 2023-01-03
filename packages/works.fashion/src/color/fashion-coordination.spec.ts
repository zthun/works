/* eslint-disable require-jsdoc */
import { ZFashionBuilder } from './fashion';
import { ZFashionCoordinationBuilder } from './fashion-coordination';

describe('ZFashionComplements', () => {
  function createTestTarget() {
    return new ZFashionCoordinationBuilder();
  }

  describe('Properties', () => {
    it('should set the main fashion', () => {
      const expected = new ZFashionBuilder().red(200).build();
      expect(createTestTarget().main(expected).build().main).toEqual(expected);
    });

    it('should set the contrast fashion', () => {
      const expected = new ZFashionBuilder().green(800).build();
      expect(createTestTarget().contrast(expected).build().contrast).toEqual(expected);
    });
  });

  describe('Transparency', () => {
    it('should set the main to transparent', () => {
      expect(createTestTarget().transparent().build().main.hue).toBeNull();
    });

    it('should remove the light', () => {
      expect(createTestTarget().transparent().build().light).toBeUndefined();
    });

    it('should remove the dark', () => {
      expect(createTestTarget().transparent().build().dark).toBeUndefined();
    });

    it('should set the contrast to inherit', () => {
      const white = new ZFashionBuilder().white().build();
      expect(createTestTarget().contrast(white).transparent().build().contrast.hue).toEqual('inherit');
    });
  });

  describe('Copy', () => {
    it('should copy another complementary object', () => {
      const main = new ZFashionBuilder().grey(800).build();
      const contrast = new ZFashionBuilder().white().build();
      const expected = createTestTarget().main(main).contrast(contrast).build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
