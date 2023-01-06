/* eslint-disable require-jsdoc */

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React, { ReactNode } from 'react';
import { ZNumberInput } from './number-input';
import { ZNumberComponentModel } from './number.cm';

describe('ZNumber', () => {
  let min: number | undefined;
  let max: number | undefined;
  let step: number | undefined;
  let value: number | undefined;
  let label: ReactNode | undefined;
  let onValueChange: jest.Mock | undefined;

  beforeEach(() => {
    min = undefined;
    max = undefined;
    value = undefined;
    step = undefined;
    label = undefined;
    onValueChange = undefined;
  });

  async function shouldRenderLabelIfSet(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    label = 'Test Label';
    const target = await createTestTarget();
    // Act.
    const actual = await target.label();
    // Assert.
    expect(actual).toEqual(label);
  }

  async function shouldNotRenderLabelIfFalsy(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.label();
    // Assert.
    expect(actual).toEqual('');
  }

  async function shouldSetTheMinValue(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    min = 2;
    const target = await createTestTarget();
    // Act.
    const actual = await target.min();
    // Assert.
    expect(actual).toEqual(min);
  }

  async function shouldSetTheMaxValue(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    max = 50;
    const target = await createTestTarget();
    // Act.
    const actual = await target.max();
    // Assert.
    expect(actual).toEqual(max);
  }

  async function shouldUpdateToMaxWhenGoingOneBeyond(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    max = 10;
    const target = await createTestTarget();
    // Act.
    await target.increment(max);
    await target.increment();
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(max);
  }

  async function shouldUpdateToMinWhenGoingOneBefore(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    min = -5;
    const target = await createTestTarget();
    // Act.
    await target.increment(1);
    await target.decrement(6);
    await target.decrement();
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(min);
  }

  async function shouldSetTheStepValue(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    step = 2;
    const target = await createTestTarget();
    // Act.
    const actual = await target.step();
    // Assert.
    expect(actual).toEqual(step);
  }

  async function shouldIncrementByStep(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    step = 5;
    min = 2;
    const target = await createTestTarget();
    const expected = step + min;
    await target.decrement(2);
    // Act.
    await target.increment();
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldSetTheControlledValue(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    value = 24;
    const target = await createTestTarget();
    // Act.
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(value);
  }

  async function shouldRaiseOnValueChange(createTestTarget: () => Promise<ZNumberComponentModel>) {
    // Arrange.
    min = 5;
    onValueChange = jest.fn();
    const target = await createTestTarget();
    const expected = 1 + min;
    await target.decrement(2);
    onValueChange.mockClear();
    // Act.
    await target.increment();
    // Assert.
    expect(onValueChange).toHaveBeenCalledWith(expected);
  }

  describe('Input', () => {
    async function createTestTarget() {
      const element = (
        <ZNumberInput min={min} max={max} step={step} value={value} label={label} onValueChange={onValueChange} />
      );

      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusBy.first(driver, ZNumberComponentModel);
    }

    describe('Value', () => {
      it('should default to null.', async () => {
        // Arrange.
        const target = await createTestTarget();
        // Act.
        const actual = await target.value();
        // Assert.
        expect(actual).toBeNull();
      });

      it('should set the controlled value.', async () => {
        await shouldSetTheControlledValue(createTestTarget);
      });

      it('should raise the onValueChange when the number changes.', async () => {
        await shouldRaiseOnValueChange(createTestTarget);
      });

      it('should receive the typed number.', async () => {
        // Arrange.
        const expected = 42;
        const target = await createTestTarget();
        // Act.
        const actual = await target.keyboard(String(expected));
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should receive NaN for invalid keyboard inputs.', async () => {
        // Arrange.
        const target = await createTestTarget();
        // Act.
        const actual = await target.keyboard('Not-a-number');
        // Assert.
        expect(actual).toBeNaN();
      });

      it('should recover from NaN to 0 when incrementing.', async () => {
        // Arrange.
        const expected = 0;
        const target = await createTestTarget();
        await target.keyboard('Not-a-number');
        // Act.
        const actual = await target.up();
        // Assert.
        expect(actual).toEqual(expected + 1);
      });

      it('should set null for the value if all text is deleted.', async () => {
        // Arrange.
        const target = await createTestTarget();
        await target.keyboard('2');
        // Act.
        await target.clear();
        const actual = await target.value();
        // Assert.
        expect(actual).toBeNull();
      });
    });

    describe('Label', () => {
      it('should render the label if set.', async () => {
        await shouldRenderLabelIfSet(createTestTarget);
      });

      it('should not render the label if falsy.', async () => {
        await shouldNotRenderLabelIfFalsy(createTestTarget);
      });
    });

    describe('Range', () => {
      it('should set the min value.', async () => {
        await shouldSetTheMinValue(createTestTarget);
      });

      it('should set the max value.', async () => {
        await shouldSetTheMaxValue(createTestTarget);
      });

      it('should update to the maximum value when attempting to go one beyond the max.', async () => {
        await shouldUpdateToMaxWhenGoingOneBeyond(createTestTarget);
      });

      it('should update to the min value when attempting to go one beyond the min.', async () => {
        await shouldUpdateToMinWhenGoingOneBefore(createTestTarget);
      });
    });

    describe('Step', () => {
      it('should set the step value.', async () => {
        await shouldSetTheStepValue(createTestTarget);
      });

      it('should increment step the appropriate value.', async () => {
        await shouldIncrementByStep(createTestTarget);
      });

      it('should increment when hitting the up arrow key.', async () => {
        // Arrange.
        min = 0;
        const expected = min + 1;
        const target = await createTestTarget();
        await target.down(min + 1);
        // Act.
        const actual = await target.up();
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should increment when hitting the up arrow key.', async () => {
        // Arrange.
        min = 0;
        max = 5;
        const expected = max - 1;
        const target = await createTestTarget();
        await target.up(max + 1);
        // Act.
        const actual = await target.down();
        // Assert.
        expect(actual).toEqual(expected);
      });
    });
  });
});
