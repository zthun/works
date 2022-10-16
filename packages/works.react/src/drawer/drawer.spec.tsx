/* eslint-disable require-jsdoc */
import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import React from 'react';
import { ZDrawerButton } from './drawer-button';
import { ZDrawerButtonComponentModel } from './drawer-button.cm';

describe('ZDrawer', () => {
  const performer = new ZCircusPerformer();
  const waiter = new ZCircusWait();

  async function createTestTarget() {
    const element = <ZDrawerButton />;
    const result = await new ZCircusSetupRender(element).setup();
    await waiter.wait(() => !!ZDrawerButtonComponentModel.find(result.container).length);
    const [target] = ZDrawerButtonComponentModel.find(result.container);
    return new ZDrawerButtonComponentModel(target, performer, waiter);
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
    // Act.
    const drawer = await target.open();
    await target.escape(drawer);
    const actual = await target.opened();
    // Assert.
    expect(actual).toBeFalsy();
  });
});