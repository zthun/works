/* eslint-disable require-jsdoc */
import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZStateAnchor } from '@zthun/works.react';
import React from 'react';
import { ZDrawerPage } from './drawer-page';
import { ZDrawerPageComponentModel } from './drawer-page.cm';

describe('ZDrawerPage', () => {
  async function createTestTarget() {
    const element = <ZDrawerPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZDrawerPageComponentModel);
  }

  async function shouldPositionDrawer(expected: ZStateAnchor) {
    // Arrange.
    const target = await createTestTarget();
    await target.anchor(expected);
    // Act.
    const drawer = await (await target.drawerButton()).open();
    const actual = await drawer.anchor();
    // Assert.
    expect(actual).toEqual(expected);
  }

  it('should open the drawer', async () => {
    // Arrange.
    const target = await createTestTarget();
    const button = await target.drawerButton();
    // Act.
    await button.open();
    const actual = await button.opened();
    // Assert.
    expect(actual).toBeTruthy();
  });

  it('should position the drawer on the left', async () => {
    await shouldPositionDrawer(ZStateAnchor.Left);
  });

  it('should position the drawer on the right', async () => {
    await shouldPositionDrawer(ZStateAnchor.Right);
  });

  it('should position the drawer on the top', async () => {
    await shouldPositionDrawer(ZStateAnchor.Top);
  });

  it('should position the drawer on the bottom', async () => {
    await shouldPositionDrawer(ZStateAnchor.Bottom);
  });

  it('should close the drawer', async () => {
    // Arrange.
    const target = await createTestTarget();
    const button = await target.drawerButton();
    const drawer = await button.open();
    // Act.
    await target.close(drawer);
    const actual = await button.opened();
    // Assert.
    expect(actual).toBeFalsy();
  });
});
