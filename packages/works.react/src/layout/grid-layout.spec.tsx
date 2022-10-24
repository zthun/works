/* eslint-disable require-jsdoc */
import { IZCircusDriver } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { ZStateSize } from '@zthun/works.core';
import React from 'react';
import { ZGridLayout } from './grid-layout';

describe('ZGridLayout', () => {
  let _driver: IZCircusDriver;
  let gap: ZStateSize | undefined;

  beforeEach(() => {
    gap = undefined;
  });

  async function createTestTarget() {
    const element = <ZGridLayout gap={gap} />;
    _driver = await new ZCircusSetupRenderer(element).setup();
    return _driver;
  }

  afterEach(async () => {
    await _driver.destroy();
  });

  it('should render with a gap', async () => {
    // Arrange.
    gap = ZStateSize.Medium;
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });

  it('should render without a gap', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
