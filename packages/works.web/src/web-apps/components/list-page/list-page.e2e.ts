/* eslint-disable require-jsdoc */

import { IZCircusDriver } from '@zthun/works.cirque';
import { ZCircusSetupChrome } from '@zthun/works.cirque-du-selenium';
import { required } from '@zthun/works.core';
import { ZAlertSeverity } from '@zthun/works.message';
import { ZListLineItemComponentModel } from '@zthun/works.react';
import { ZListPageComponentModel } from './list-page.cm';

describe('List Page', () => {
  let _driver: IZCircusDriver;

  afterEach(() => {
    _driver.destroy();
  });

  async function createTestTarget() {
    _driver = await new ZCircusSetupChrome('https://local.zthunworks.com/#/web-apps/components/list').setup();
    await _driver.wait(() => _driver.peek(ZListPageComponentModel.Selector));
    return new ZListPageComponentModel(_driver);
  }

  it('should open a success alert when the everything item is clicked.', async () => {
    // Arrange.
    const target = await createTestTarget();
    const list = await target.list();
    // Act.
    const everything = await required(list.item('everything'));
    const item = new ZListLineItemComponentModel(everything);
    await item.click();
    const alerts = await target.alerts();
    const [alert] = await alerts.alerts();
    const actual = await alert.severity();
    // Assert.
    expect(actual).toEqual(ZAlertSeverity.Success);
  });
});
