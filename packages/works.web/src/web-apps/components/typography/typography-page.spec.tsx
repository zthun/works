/* eslint-disable require-jsdoc */

import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZTypographyPage } from './typography-page';
import { ZTypographyPageComponentModel } from './typography-page.cm';

describe('ZTypographyPage', () => {
  async function createTestTarget() {
    const element = <ZTypographyPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(driver, ZTypographyPageComponentModel, ZTypographyPageComponentModel.Selector);
  }

  it('should render the page.', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
