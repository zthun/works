import { createSizeChartFixedCss } from './size-chart-fixed-css';
import { createSizeChartFixedExponential } from './size-chart-fixed-exponential';
import { createSizeChartFixedFibonacci } from './size-chart-fixed-fibonacci';
import { createSizeChartFixedGeometric } from './size-chart-fixed-geometric';
import { createSizeChartFixedLinear } from './size-chart-fixed-linear';
import { createSizeChartVariedCss } from './size-chart-varied-css';
import { createSizeChartVoidCss } from './size-chart-void-css';
import { ZSizeChartFixed, ZSizeFixed } from './size-fixed';
import { ZSizeChartVaried, ZSizeVaried } from './size-varied';
import { ZSizeChartVoid, ZSizeVoid } from './size-void';

describe('Size Chart', () => {
  describe('Fixed', () => {
    describe('Linear', () => {
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
        const actual = createSizeChartFixedLinear(2, 1, 4);
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should set the sizes at x = 1', () => {
        // Arrange.
        const expected: ZSizeChartFixed<number> = {
          [ZSizeFixed.ExtraSmall]: 3,
          [ZSizeFixed.Small]: 5,
          [ZSizeFixed.Medium]: 7,
          [ZSizeFixed.Large]: 9,
          [ZSizeFixed.ExtraLarge]: 11
        };
        // Act.
        const actual = createSizeChartFixedLinear(2, 1);
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should set the sizes incrementing', () => {
        // Arrange.
        const expected: ZSizeChartFixed<number> = {
          [ZSizeFixed.ExtraSmall]: 1,
          [ZSizeFixed.Small]: 2,
          [ZSizeFixed.Medium]: 3,
          [ZSizeFixed.Large]: 4,
          [ZSizeFixed.ExtraLarge]: 5
        };
        // Act.
        const actual = createSizeChartFixedLinear(1, 0);
        // Assert.
        expect(actual).toEqual(expected);
      });
    });

    describe('Geometric', () => {
      it('should set the sizes', () => {
        // Arrange
        const expected: ZSizeChartFixed<number> = {
          [ZSizeFixed.ExtraSmall]: 10,
          [ZSizeFixed.Small]: 20,
          [ZSizeFixed.Medium]: 40,
          [ZSizeFixed.Large]: 80,
          [ZSizeFixed.ExtraLarge]: 160
        };
        // Act.
        const actual = createSizeChartFixedGeometric(2, 10);
        // Assert.
        expect(actual).toEqual(expected);
      });
    });

    describe('Exponential', () => {
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
        const actual = createSizeChartFixedExponential(2, 4);
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should set the sizes starting at x = 1', () => {
        // Arrange
        const expected: ZSizeChartFixed<number> = {
          [ZSizeFixed.ExtraSmall]: 2,
          [ZSizeFixed.Small]: 4,
          [ZSizeFixed.Medium]: 8,
          [ZSizeFixed.Large]: 16,
          [ZSizeFixed.ExtraLarge]: 32
        };
        // Act.
        const actual = createSizeChartFixedExponential(2);
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
        const base = createSizeChartFixedLinear(1, 0);
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
      // Arrange.
      const expected: ZSizeChartVoid<string> = {
        [ZSizeVoid.None]: '0'
      };
      // Act.
      const actual = createSizeChartVoidCss();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });
});
