/* eslint-disable require-jsdoc */

import { IZCircusDriver } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { required } from '@zthun/works.core';
import React from 'react';
import { ZList } from './list';
import { ZListLineItem } from './list-line-item';
import { ZListLineItemComponentModel } from './list-line-item.cm';
import { ZListComponentModel } from './list.cm';

describe('ZList', () => {
  let _driver: IZCircusDriver;
  let onClick: jest.Mock | undefined;

  async function createTestTarget() {
    const element = (
      <ZList>
        <ZListLineItem name='clickable' onClick={onClick} heading='Can Click' />
        <ZListLineItem name='no-click' heading='No Click' />
      </ZList>
    );

    _driver = await new ZCircusSetupRenderer(element).setup();
    await _driver.wait(() => _driver.peek(ZListComponentModel.Selector));
    const target = await _driver.select(ZListComponentModel.Selector);
    return new ZListComponentModel(target);
  }

  beforeEach(() => {
    onClick = undefined;
  });

  afterEach(async () => {
    await _driver.destroy();
  });

  it('should render all items', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.items();
    // Assert.
    expect(actual.length).toEqual(2);
  });

  it('should not render an item that does not exist', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.item('missing');
    // Assert.
    expect(actual).toBeFalsy();
  });

  describe('Line Items', () => {
    it('should render the line item without being able to click on it', async () => {
      // Arrange.
      const target = await createTestTarget();
      const item = await required(target.item('no-click'));
      const lineItem = new ZListLineItemComponentModel(item);
      // Act.
      const actual = await lineItem.clickable();
      // Should do nothing.
      await lineItem.click();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should raise the onClick event of a line item if onClick is set', async () => {
      // Arrange.
      onClick = jest.fn();
      const target = await createTestTarget();
      const item = await required(target.item('clickable'));
      const lineItem = new ZListLineItemComponentModel(item);
      // Act.
      const actual = await lineItem.clickable();
      await lineItem.click();
      // Assert.
      expect(actual).toBeTruthy();
      expect(onClick).toHaveBeenCalled();
    });
  });
});
