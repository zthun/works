/* eslint-disable require-jsdoc */

import { IZCircusDriver, ZCircusBy } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { IZFashion, ZFashionBuilder, ZHue } from '@zthun/works.fashion';
import React from 'react';
import { ZFashionGrid } from './fashion-grid';
import { ZFashionGridComponentModel } from './fashion-grid.cm';

describe('ZFashionGrid', () => {
  let value: IZFashion | undefined;
  let onValueChange: jest.Mock | undefined;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZFashionGrid value={value} onValueChange={onValueChange} />;
    _driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(_driver, ZFashionGridComponentModel);
  }

  beforeEach(() => {
    value = undefined;
    onValueChange = undefined;
  });

  afterEach(() => _driver.destroy());

  describe('Colors', () => {
    it('should not render white blocks', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.get(new ZFashionBuilder().white().build());
      // Assert.
      expect(actual).toBeNull();
    });

    it('should not render black blocks', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.get(new ZFashionBuilder().black().build());
      // Assert.
      expect(actual).toBeNull();
    });

    it('should not render transparent blocks', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.get(new ZFashionBuilder().transparent().build());
      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe('Navigation', () => {
    it('should navigate through the tab index', async () => {
      // Arrange.
      const target = await createTestTarget();
      await target.next();
      await target.next();
      await target.next();
      // Act.
      const focused = await target.next();
      // Assert
      expect(await focused?.hue()).toEqual(ZHue.Red);
      expect(await focused?.shade()).toEqual(300);
    });

    it('should return no focus if there is no focused block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.focused();
      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe('Selection', () => {
    it('should select the appropriate fashion from the provided value', async () => {
      // Arrange.
      value = new ZFashionBuilder().green(300).build();
      const target = await createTestTarget();
      // Act.
      const actual = await target.selected();
      // Assert.
      expect(await actual?.hue()).toEqual(value.hue);
      expect(await actual?.shade()).toEqual(value.shade);
    });

    it('should select the appropriate fashion when a fashion block is clicked', async () => {
      // Arrange.
      const target = await createTestTarget();
      const block = await target.get(ZHue.Blue, 600);
      // Act.
      await block?.click();
      const actual = await target.selected();
      // Assert.
      expect(await actual?.hue()).toEqual(ZHue.Blue);
      expect(await actual?.shade()).toEqual(600);
    });

    it('should select the appropriate fashion when the enter key is pressed', async () => {
      // Arrange.
      const target = await createTestTarget();
      const focused = await target.next();
      // Act.
      await focused?.enter();
      const actual = await target.selected();
      // Assert.
      expect(await actual?.hue()).toEqual(ZHue.Red);
      expect(await actual?.shade()).toEqual(50);
    });

    it('should select the appropriate fashion when the space key is pressed', async () => {
      // Arrange.
      const target = await createTestTarget();
      await target.next();
      await target.next();
      await target.next();
      const focused = await target.prev();
      // Act.
      await focused?.space();
      const actual = await target.selected();
      // Assert.
      expect(await actual?.hue()).toEqual(ZHue.Red);
      expect(await actual?.shade()).toEqual(100);
    });

    it('should raise the onValueChange when the fashion is clicked', async () => {
      // Arrange.
      onValueChange = jest.fn();
      const expected = new ZFashionBuilder().blue(600).build();
      const target = await createTestTarget();
      const block = await target.get(expected);
      // Act.
      await block?.click();
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('should raise the onValueChange when the enter button is pressed', async () => {
      // Arrange.
      onValueChange = jest.fn();
      const expected = new ZFashionBuilder().red(50).build();
      const target = await createTestTarget();
      const block = await target.next();
      // Act.
      await block?.enter();
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('should raise the onValueChange when the fashion is clicked', async () => {
      // Arrange.
      onValueChange = jest.fn();
      const expected = new ZFashionBuilder().red(50).build();
      const target = await createTestTarget();
      const block = await target.next();
      // Act.
      await block?.space();
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('should remove the selection when the selected fashion is shift clicked', async () => {
      // Arrange.
      const target = await createTestTarget();
      const block = await target.get(ZHue.Green, 400);
      await block?.click();
      // Act.
      await block?.toggle();
      const actual = await target.selected();
      // Assert.
      expect(actual).toBeNull();
    });

    it('should select transparent when the currently selected fashion is shift clicked', async () => {
      // Arrange.
      const expected = new ZFashionBuilder().transparent().build();
      onValueChange = jest.fn();
      const target = await createTestTarget();
      const block = await target.get(ZHue.Green, 400);
      await block?.click();
      // Act.
      await block?.toggle();
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining(expected));
    });
  });
});
