/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZButton } from '../buttons/button';
import { ZToolbarLayout } from './toolbar-layout';
import { ZToolbarLayoutComponentModel } from './toolbar-layout.cm';

describe('ZToolbarLayout', () => {
  async function createTestTarget() {
    const element = (
      <ZToolbarLayout>
        <ZButton />
      </ZToolbarLayout>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(driver, ZToolbarLayoutComponentModel, ZToolbarLayoutComponentModel.Selector);
  }

  it('should render the component.', async () => {
    // Arrange
    // Act.
    const target = await createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
