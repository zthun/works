import { Then, When } from '@cucumber/cucumber';
import { ZAlertSeverity } from '@zthun/works.message';
import { ZListLineItemComponentModel } from '@zthun/works.react';
import assert from 'assert';
import { fullPath, ZRouteList } from '../../src/routes';
import { ZListPageComponentModel } from '../../src/web-apps/components/list/list-page.cm';
import { ZLearnWorld } from '../learn-world';

When('I navigate to the list demo page', async function (this: ZLearnWorld<ZListPageComponentModel>) {
  await this.open(fullPath(ZRouteList));
  this.parameters.page = await this.create(ZListPageComponentModel);
});

When(
  'I click the {string} item on the list demo page',
  async function (this: ZLearnWorld<ZListPageComponentModel>, name: string) {
    const { page } = this.parameters;
    const list = await page.list();
    const item = await list.item(name);
    const lineItem = new ZListLineItemComponentModel(item!);
    await lineItem.click();
  }
);

Then(
  'an alert of severity, {string}, is displayed on the list demo page',
  async function (this: ZLearnWorld<ZListPageComponentModel>, severity: ZAlertSeverity) {
    const { page } = this.parameters;
    const alerts = await page.alerts();
    const [alert] = await alerts.alerts();
    const actual = await alert.severity();
    assert.equal(actual, severity);
  }
);