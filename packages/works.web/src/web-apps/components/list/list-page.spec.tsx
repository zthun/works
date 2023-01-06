/* eslint-disable require-jsdoc */
import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZAlertSeverity } from '@zthun/works.message';
import { ZAlertList, ZListLineItemComponentModel } from '@zthun/works.react';
import React from 'react';
import { ZListPage } from './list-page';
import { ZListPageComponentModel } from './list-page.cm';

describe('ZListPage', () => {
  async function createTestTarget() {
    const element = (
      <>
        <ZAlertList />
        <ZListPage />
      </>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZListPageComponentModel);
  }

  async function shouldRaiseAnAlert(expected: ZAlertSeverity, name: string) {
    // Arrange.
    const target = await createTestTarget();
    const list = await target.list();
    const everything = await list.item(name);
    const lineItem = new ZListLineItemComponentModel(everything!);
    // Act.
    await lineItem.click();
    const [alert] = await (await target.alerts()).alerts();
    const actual = await alert.severity();
    // Assert.
    expect(actual).toEqual(expected);
  }

  it('should show a success alert when the everything item is clicked', async () => {
    await shouldRaiseAnAlert(ZAlertSeverity.Success, 'everything');
  });

  it('should show a warning alert when the text-only item is clicked', async () => {
    await shouldRaiseAnAlert(ZAlertSeverity.Warning, 'text-only');
  });
});
