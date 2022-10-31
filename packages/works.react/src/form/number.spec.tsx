/* eslint-disable require-jsdoc */

import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { ZSizeFixed } from '@zthun/works.core';
import React, { ReactNode } from 'react';
import { ZNumberSlider } from './number-slider';
import { ZNumberComponentModel } from './number.cm';

describe('ZNumberSlider', () => {
  let min: number | undefined;
  let max: number | undefined;
  let step: number | undefined;
  let value: number | undefined;
  let label: ReactNode | undefined;
  let width: ZSizeFixed | undefined;
  let onValueChange: jest.Mock | undefined;

  async function createTestTarget() {
    const element = (
      <ZNumberSlider
        min={min}
        max={max}
        step={step}
        value={value}
        label={label}
        onValueChange={onValueChange}
        width={width}
      />
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(driver, ZNumberComponentModel, ZNumberComponentModel.Selector);
  }

  beforeEach(() => {
    min = undefined;
    max = undefined;
    value = undefined;
    step = undefined;
    label = undefined;
    width = undefined;
    onValueChange = undefined;

    // Workaround for JSDOM
    const rect = {
      x: 0,
      y: 0,
      width: 1920,
      height: 1080,
      left: 0,
      right: 500,
      top: 0,
      bottom: 25
    } as unknown as DOMRect;
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(rect);
  });

  it('should render the component', async () => {
    // Arrange.
    width = ZSizeFixed.ExtraLarge;
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });

  describe('Value', () => {
    it('should default to the minimum value.', async () => {
      // Arrange.
      min = 5;
      const target = await createTestTarget();
      // Act.
      const actual = await target.value();
      // Assert.
      expect(actual).toEqual(5);
    });
  });

  describe('Label', () => {
    it('should render the label if set.', async () => {
      // Arrange.
      label = 'Test Label';
      const target = await createTestTarget();
      // Act.
      const actual = await target.label();
      // Assert.
      expect(actual).toEqual(label);
    });

    it('should not render the label if falsy.', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.label();
      // Assert.
      expect(actual).toEqual('');
    });
  });

  describe('Range', () => {
    it('should set the min value.', async () => {
      // Arrange.
      min = 2;
      const target = await createTestTarget();
      // Act.
      const actual = await target.min();
      // Assert.
      expect(actual).toEqual(min);
    });

    it('should set the max value.', async () => {
      // Arrange.
      max = 50;
      const target = await createTestTarget();
      // Act.
      const actual = await target.max();
      // Assert.
      expect(actual).toEqual(max);
    });

    it('should update to the maximum value when attempting to go one beyond the max.', async () => {
      // Arrange.
      max = 10;
      const target = await createTestTarget();
      // Act.
      await target.increment(max);
      await target.increment();
      const actual = await target.value();
      // Assert.
      expect(actual).toEqual(max);
    });

    it('should update to the min value when attempting to go one beyond the min.', async () => {
      // Arrange.
      min = -5;
      const target = await createTestTarget();
      // Act.
      await target.increment(5);
      await target.decrement(5);
      await target.decrement();
      const actual = await target.value();
      // Assert.
      expect(actual).toEqual(min);
    });
  });

  describe('Step', () => {
    it('should set the step value.', async () => {
      // Arrange.
      step = 2;
      const target = await createTestTarget();
      // Act.
      const actual = await target.step();
      // Assert.
      expect(actual).toEqual(step);
    });

    it('should increment step the appropriate value.', async () => {
      // Arrange.
      step = 5;
      min = 2;
      const target = await createTestTarget();
      const expected = step + min;
      // Act.
      await target.increment();
      const actual = await target.value();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should set the controlled value.', async () => {
      // Arrange.
      value = 24;
      const target = await createTestTarget();
      // Act.
      const actual = await target.value();
      // Assert.
      expect(actual).toEqual(value);
    });

    it('should raise the onValueChange when the number changes.', async () => {
      // Arrange.
      min = 5;
      onValueChange = jest.fn();
      const target = await createTestTarget();
      const expected = 1 + min;
      // Act.
      await target.increment();
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expected);
    });
  });
});
