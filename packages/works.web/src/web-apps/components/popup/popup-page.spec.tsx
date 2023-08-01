import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZPopupPage } from './popup-page';
import { ZPopupPageComponentModel } from './popup-page.cm';

describe('ZPopupPage', () => {
  async function createTestTarget() {
    const element = <ZPopupPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZPopupPageComponentModel);
  }

  it('should open the popup', async () => {
    // Arrange.
    const target = await createTestTarget();
    const toggler = await target.toggler();
    // Act.
    await toggler.open();
    const actual = await toggler.opened();
    // Assert.
    expect(actual).toBeTruthy();
  });
});
