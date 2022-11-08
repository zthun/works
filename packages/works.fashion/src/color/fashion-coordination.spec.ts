/* eslint-disable require-jsdoc */
import { assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZFashionBuilder } from './fashion';
import { IZFashionCoordination, ZFashionCoordinationBuilder } from './fashion-coordination';

describe('ZFashionComplements', () => {
  function createTestTarget() {
    return new ZFashionCoordinationBuilder();
  }

  describe('Properties', () => {
    it('should set the main fashion', () => {
      assertBuilderSetsProperty(
        new ZFashionBuilder().red(200).build(),
        createTestTarget,
        (t, v) => t.main(v),
        (c: IZFashionCoordination) => c.main
      );
    });

    it('should set the contrast fashion', () => {
      assertBuilderSetsProperty(
        new ZFashionBuilder().green(800).build(),
        createTestTarget,
        (t, v) => t.contrast(v),
        (c: IZFashionCoordination) => c.contrast
      );
    });
  });

  describe('Copy', () => {
    it('should copy another complementary object', () => {
      const main = new ZFashionBuilder().grey(800).build();
      const contrast = new ZFashionBuilder().white().build();
      assertBuilderCopiesObject(createTestTarget().main(main).contrast(contrast).build(), createTestTarget);
    });
  });
});
