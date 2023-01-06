/* eslint-disable require-jsdoc */

import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZSizeFixed, ZSizeVaried } from '@zthun/works.chonkify';
import React from 'react';
import { ZPaddedBox } from './padded-box';

describe('ZPaddedBox', () => {
  async function createTestTarget() {
    const element = <ZPaddedBox padding={ZSizeFixed.Large} margin={ZSizeVaried.Fit} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return driver;
  }

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
