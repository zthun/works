/* eslint-disable require-jsdoc */
import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { ZDrawerButton } from './drawer-button';
import { ZDrawerButtonComponentModel } from './drawer-button.cm';

describe('ZDrawer', () => {
  async function createTestTarget() {
    const element = <ZDrawerButton />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZDrawerButtonComponentModel);
  }

  it('should open the drawer', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    await target.open();
    const actual = await target.opened();
    // Assert.
    expect(actual).toBeTruthy();
  });

  it('should close the drawer when the user clicks on the backdrop.', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const drawer = await target.open();
    await target.close(drawer);
    const actual = await target.opened();
    // Assert.
    expect(actual).toBeFalsy();
  });

  it('should close the drawer when the user presses the escape key', async () => {
    // Arrange.
    const target = await createTestTarget();
    await target.open();
    // Act.
    const drawer = await target.open();
    await target.escape(drawer);
    const actual = await target.opened();
    // Assert.
    expect(actual).toBeFalsy();
  });
});
