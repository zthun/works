/* eslint-disable require-jsdoc */
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { Property } from 'csstype';
import React from 'react';
import { ZGridLayout } from './grid-layout';

describe('ZGridLayout', () => {
  let gap: ZSizeFixed | ZSizeVoid | undefined;
  let xs: Property.GridTemplateColumns | undefined;
  let sm: Property.GridTemplateColumns | undefined;
  let md: Property.GridTemplateColumns | undefined;
  let lg: Property.GridTemplateColumns | undefined;
  let xl: Property.GridTemplateColumns | undefined;

  beforeEach(() => {
    gap = undefined;

    xs = undefined;
    sm = undefined;
    md = undefined;
    lg = undefined;
    xl = undefined;
  });

  async function createTestTarget() {
    const element = <ZGridLayout gap={gap} columns={xl} columnsLg={lg} columnsMd={md} columnsSm={sm} columnsXs={xs} />;
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

  it('should render with responsive columns', async () => {
    // Arrange.
    xl = 'auto auto auto auto auto';
    lg = 'auto auto auto auto';
    md = 'auto auto auto';
    sm = 'auto auto';
    xs = 'auto';
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
