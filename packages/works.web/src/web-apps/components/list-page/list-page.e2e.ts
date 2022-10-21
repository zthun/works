/* eslint-disable require-jsdoc */

import { IZCircusDriver } from '@zthun/works.cirque';
import { ZCircusSetupChrome } from '@zthun/works.cirque-du-selenium';
import { required } from '@zthun/works.core';
import { ZAlertSeverity } from '@zthun/works.message';
import { ZListLineItemComponentModel } from '@zthun/works.react';
import { ZListPageComponentModel } from './list-page.cm';

describe('List Page', () => {
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    _driver = await new ZCircusSetupChrome('https://local.zthunworks.com/#/web-apps/components/list').setup();
    await _driver.wait(() => _driver.peek(ZListPageComponentModel.Selector));
    return new ZListPageComponentModel(_driver);
  }

  afterEach(async () => {
    await _driver.destroy();
  });

  async function assertDisplaysAlert(expected: ZAlertSeverity, name: string) {
    // Arrange.
    const target = await createTestTarget();
    const list = await target.list();
    // Act.
    const itemToClick = await required(list.item(name));
    await new ZListLineItemComponentModel(itemToClick).click();
    const alertList = await target.alertList();
    const [alert] = await alertList.alerts();
    const actual = await alert.severity();
    // Assert.
    expect(actual).toEqual(expected);
  }

  it('should open a success alert when the everything item is clicked.', async () => {
    await assertDisplaysAlert(ZAlertSeverity.Success, 'everything');
  });

  it('should open a warning alert when the text only item is clicked.', async () => {
    await assertDisplaysAlert(ZAlertSeverity.Warning, 'text-only');
  });

  it('should not do anything when clicking on the avatar with and without the adornment', async () => {
    // Arrange.
    const target = await createTestTarget();
    const list = await target.list();
    // Act.
    const withoutAdornment = await required(list.item('avatar-and-text'));
    const withAdornment = await required(list.item('avatar-text-and-adornment'));
    const withoutAdornmentClickable = await new ZListLineItemComponentModel(withoutAdornment).clickable();
    const withAdornmentClickable = await new ZListLineItemComponentModel(withAdornment).clickable();
    // Assert.
    expect(withoutAdornmentClickable).toBeFalsy();
    expect(withAdornmentClickable).toBeFalsy();
  });
});
