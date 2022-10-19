/* eslint-disable require-jsdoc */
import { ZCircusSetupRender } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZStateSize } from '../theme/state-size';
import { ZGridLayout } from './grid-layout';

describe('ZGridLayout', () => {
  let gap: ZStateSize | undefined;

  beforeEach(() => {
    gap = undefined;
  });

  async function createTestTarget() {
    const element = <ZGridLayout gap={gap} />;
    return await new ZCircusSetupRender(element).setup();
  }

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
