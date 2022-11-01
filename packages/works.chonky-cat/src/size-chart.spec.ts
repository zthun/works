import { createSizeChartFixedArithmetic } from './fixed/size-chart-fixed-arithmetic';
import { createSizeChartFixedCss } from './fixed/size-chart-fixed-css';
import { createSizeChartFixedFibonacci } from './fixed/size-chart-fixed-fibonacci';
import { createSizeChartFixedGeometric } from './fixed/size-chart-fixed-geometric';
import { ZSizeChartFixed, ZSizeFixed } from './fixed/size-fixed';
import { createSizeChartVariedCss } from './varied/size-chart-varied-css';
import { ZSizeChartVaried, ZSizeVaried } from './varied/size-varied';
import { createSizeChartVoidCss } from './void/size-chart-void-css';
import { createSizeChartVoidZero } from './void/size-chart-void-zero';
import { ZSizeChartVoid, ZSizeVoid } from './void/size-void';

describe('Size Chart', () => {
  describe('Fixed', () => {
    describe('Arithmetic', () => {
      it('should set the sizes', () => {
        // Arrange.
        const expected: ZSizeChartFixed<number> = {
          [ZSizeFixed.ExtraSmall]: 9,
          [ZSizeFixed.Small]: 11,
          [ZSizeFixed.Medium]: 13,
          [ZSizeFixed.Large]: 15,
          [ZSizeFixed.ExtraLarge]: 17
        };
        // Act.
        const actual = createSizeChartFixedArithmetic(2, 9);
        // Assert.
        expect(actual).toEqual(expected);
      });
    });

    describe('Geometric', () => {
      it('should set the sizes', () => {
        // Arrange
        const expected: ZSizeChartFixed<number> = {
          [ZSizeFixed.ExtraSmall]: 16,
          [ZSizeFixed.Small]: 32,
          [ZSizeFixed.Medium]: 64,
          [ZSizeFixed.Large]: 128,
          [ZSizeFixed.ExtraLarge]: 256
        };
        // Act.
        const actual = createSizeChartFixedGeometric(2, 16);
        // Assert.
        expect(actual).toEqual(expected);
      });
    });

    describe('Fibonacci', () => {
      it('should set the sizes', () => {
        // Arrange.
        const expected: ZSizeChartFixed<number> = {
          [ZSizeFixed.ExtraSmall]: 5,
          [ZSizeFixed.Small]: 6,
          [ZSizeFixed.Medium]: 11,
          [ZSizeFixed.Large]: 17,
          [ZSizeFixed.ExtraLarge]: 28
        };
        // Act.
        const actual = createSizeChartFixedFibonacci(5, 6);
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should set the sizes starting at xs = 1 and sm = 2', () => {
        // Arrange.
        const expected: ZSizeChartFixed<number> = {
          [ZSizeFixed.ExtraSmall]: 1,
          [ZSizeFixed.Small]: 2,
          [ZSizeFixed.Medium]: 3,
          [ZSizeFixed.Large]: 5,
          [ZSizeFixed.ExtraLarge]: 8
        };
        // Act.
        const actual = createSizeChartFixedFibonacci();
        // Assert.
        expect(actual).toEqual(expected);
      });
    });

    describe('CSS', () => {
      it(`should set the sizes for a unit`, () => {
        // Arrange.
        const expected: ZSizeChartFixed<string> = {
          [ZSizeFixed.ExtraSmall]: `1rem`,
          [ZSizeFixed.Small]: `2rem`,
          [ZSizeFixed.Medium]: `3rem`,
          [ZSizeFixed.Large]: `4rem`,
          [ZSizeFixed.ExtraLarge]: `5rem`
        };
        const base = createSizeChartFixedArithmetic(1, 1);
        // Act.
        const actual = createSizeChartFixedCss(base, 'rem');
        // Assert.
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Varied', () => {
    it('should set the sizes', () => {
      // Arrange.
      const expected: ZSizeChartVaried<string> = {
        [ZSizeVaried.Fit]: 'auto',
        [ZSizeVaried.Full]: '100%'
      };
      // Act.
      const actual = createSizeChartVariedCss();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Void', () => {
    it('should set the sizes', () => {
      // Arrange
      const expected: ZSizeChartVoid<string> = {
        [ZSizeVoid.None]: '0'
      };
      // Act
      const actual = createSizeChartVoidCss();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('should set the sizes to 0.', () => {
      // Arrange
      const expected: ZSizeChartVoid<number> = {
        [ZSizeVoid.None]: 0
      };
      // Act
      const actual = createSizeChartVoidZero();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
