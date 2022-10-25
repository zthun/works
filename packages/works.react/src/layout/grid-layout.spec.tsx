/* eslint-disable require-jsdoc */
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { ZSizeFixed, ZSizeVoid } from '@zthun/works.core';
import React from 'react';
import { ZGridLayout } from './grid-layout';

describe('ZGridLayout', () => {
  let gap: ZSizeFixed | ZSizeVoid | undefined;

  beforeEach(() => {
    gap = undefined;
  });

  async function createTestTarget() {
    const element = <ZGridLayout gap={gap} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return driver;
  }

  it('should render with a gap', async () => {
    // Arrange.
    gap = ZSizeFixed.Medium;
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
