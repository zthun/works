/* eslint-disable require-jsdoc */
import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React from 'react';
import { ZSuspensePage } from './suspense-page';
import { ZSuspensePageComponentModel } from './suspense-page.cm';

describe('ZSuspensePage', () => {
  async function createTestTarget() {
    const element = <ZSuspensePage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZSuspensePageComponentModel);
  }

  async function assertDisplaysTheSuspenseWhenTheLoadingOptionIs(expected: boolean) {
    // Arrange.
    const target = await createTestTarget();
    const loading = await target.loading();
    await loading.toggle(!expected);
    // Act.
    await loading.toggle(expected);
    const actual = await target.rotate();
    // Assert.
    expect(!!actual).toEqual(expected);
  }

  async function assertSetsWidth(expected: ZSizeFixed) {
    // Arrange
    const target = await createTestTarget();
    const width = await target.width();
    // Act.
    await width.select(expected);
    const suspense = await target.rotate();
    const actual = await suspense?.width();
    // Assert.
    expect(actual).toEqual(expected);
  }

  it('should show the loader when the loading option is checked.', async () => {
    await assertDisplaysTheSuspenseWhenTheLoadingOptionIs(true);
  });

  it('should hide the loader when the loading option is unchecked.', async () => {
    await assertDisplaysTheSuspenseWhenTheLoadingOptionIs(false);
  });

  it('should adjust the suspense width to xs.', async () => {
    await assertSetsWidth(ZSizeFixed.ExtraSmall);
  });

  it('should adjust the suspense width to sm.', async () => {
    await assertSetsWidth(ZSizeFixed.Small);
  });

  it('should adjust the suspense width to md.', async () => {
    await assertSetsWidth(ZSizeFixed.Medium);
  });

  it('should adjust the suspense width to lg.', async () => {
    await assertSetsWidth(ZSizeFixed.Large);
  });

  it('should adjust the suspense width to xl.', async () => {
    await assertSetsWidth(ZSizeFixed.ExtraLarge);
  });
});
