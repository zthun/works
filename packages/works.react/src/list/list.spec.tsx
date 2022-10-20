/* eslint-disable require-jsdoc */

import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZList } from './list';
import { ZListLineItem } from './list-line-item';
import { ZListLineItemComponentModel } from './list-line-item.cm';
import { ZListComponentModel } from './list.cm';

describe('ZList', () => {
  const performer = new ZCircusPerformer();
  const waiter = new ZCircusWait();

  let onClick: jest.Mock | undefined;

  async function createTestTarget() {
    const element = (
      <ZList>
        <ZListLineItem onClick={onClick} />
      </ZList>
    );

    const result = await new ZCircusSetupRender(element).setup();
    await waiter.wait(() => !!ZListComponentModel.find(result.container).length);
    const [target] = ZListComponentModel.find(result.container);
    return new ZListComponentModel(target, performer, waiter);
  }

  beforeEach(() => {
    onClick = undefined;
  });

  describe('Line Items', () => {
    it('should render the line item without being able to click on it', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const [item] = await target.itemsByClass(ZListLineItemComponentModel, ZListLineItemComponentModel.ClassName);
      const actual = await item.clickable();
      // Should do nothing.
      await item.click();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should raise the onClick event of a line item if onClick is set', async () => {
      // Arrange.
      onClick = jest.fn();
      const target = await createTestTarget();
      // Act.
      const [item] = await target.itemsByClass(ZListLineItemComponentModel, ZListLineItemComponentModel.ClassName);
      const actual = await item.clickable();
      await item.click();
      // Assert.
      expect(actual).toBeTruthy();
      expect(onClick).toHaveBeenCalled();
    });
  });
});
