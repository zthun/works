/* eslint-disable require-jsdoc */

import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { ZChoiceComponentModel } from '@zthun/works.react';
import React from 'react';
import { ZChoicePage } from './choice-page';
import { ZChoicePageComponentModel } from './choice-page.cm';

describe('ZChoicePage', () => {
  async function createTestTarget() {
    const element = <ZChoicePage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(driver, ZChoicePageComponentModel, ZChoicePageComponentModel.Selector);
  }

  type ChoicePageFactory = (t: ZChoicePageComponentModel) => Promise<ZChoiceComponentModel>;

  async function shouldSelectTheValue(factory: ChoicePageFactory) {
    // Arrange.
    const target = await createTestTarget();
    const choice = await factory(target);
    await choice.clear();
    const [initial, value] = await choice.open();
    const expected = await value.value();
    // Act.
    await choice.select(initial);
    await choice.select(value);
    const actual = await target.value();
    const [first] = actual;
    // Assert.
    expect(actual.length).toEqual(1);
    expect(first).toEqual(expected);
  }

  async function shouldBeDisabled(factory: ChoicePageFactory) {
    // Arrange
    const target = await createTestTarget();
    const disabled = await target.disabled();
    const choice = await factory(target);
    await disabled.toggle(false);
    // Act.
    await disabled.toggle(true);
    const actual = await choice.disabled();
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldAllowMultipleItems(factory: ChoicePageFactory) {
    // Arrange
    const target = await createTestTarget();
    const multiple = await target.multiple();
    const choice = await factory(target);
    const [first, second] = await choice.open();
    const expected = await Promise.all([first.value(), second.value()]);
    await multiple.toggle(false);
    // Act
    await multiple.toggle(true);
    await choice.clear();
    await choice.select(first);
    await choice.select(second);
    const actual = await target.value();
    // assert.
    expect(actual).toEqual(expected);
  }

  async function shouldBeIndelible(factory: ChoicePageFactory) {
    // Arrange
    const target = await createTestTarget();
    const indelible = await target.indelible();
    const choice = await factory(target);
    const [, value] = await choice.open();
    await choice.select(value);
    await indelible.toggle(false);
    // Act
    await indelible.toggle(true);
    await choice.clear();
    const options = await choice.open();
    // assert.
    expect(options.length).toBeGreaterThan(0);
  }

  describe('Drop Down', () => {
    const factory = (t: ZChoicePageComponentModel) => t.dropdown();

    it('should select the value', async () => {
      await shouldSelectTheValue(factory);
    });

    it('should disable the choice', async () => {
      await shouldBeDisabled(factory);
    });

    it('should allow multiple selections in the choice', async () => {
      await shouldAllowMultipleItems(factory);
    });

    it('should be indelible', async () => {
      await shouldBeIndelible(factory);
    });
  });

  describe('Auto complete', () => {
    const factory = (t: ZChoicePageComponentModel) => t.autocomplete();

    it('should select the value', async () => {
      await shouldSelectTheValue(factory);
    });

    it('should disable the choice', async () => {
      await shouldBeDisabled(factory);
    });

    it('should allow multiple selections in the choice', async () => {
      await shouldAllowMultipleItems(factory);
    });

    it('should be indelible', async () => {
      await shouldBeIndelible(factory);
    });
  });
});
