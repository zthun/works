/* eslint-disable require-jsdoc */
import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { ZBorderLayout } from './border-layout';
import { ZBorderLayoutComponentModel } from './border-layout.cm';

describe('ZBorderLayout', () => {
  let onClick: jest.Mock | undefined;

  async function createTestTarget() {
    const element = <ZBorderLayout onClick={onClick} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBorderLayoutComponentModel);
  }

  beforeEach(() => {
    onClick = undefined;
  });

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });

  it('should raise the onClick event when the layout is clicked', async () => {
    // Arrange.
    onClick = jest.fn();
    const target = await createTestTarget();
    // Act.
    await target.click();
    // Assert.
    expect(onClick).toHaveBeenCalled();
  });
});
