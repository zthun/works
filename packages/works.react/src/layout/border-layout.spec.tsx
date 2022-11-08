/* eslint-disable require-jsdoc */
import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZBorderLayout } from './border-layout';
import { ZBorderLayoutComponentModel } from './border-layout.cm';

describe('ZBorderLayout', () => {
  async function createTestTarget() {
    const element = <ZBorderLayout />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(driver, ZBorderLayoutComponentModel, ZBorderLayoutComponentModel.Selector);
  }

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
