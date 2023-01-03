import { Given, Then, When } from '@cucumber/cucumber';
import { sleep } from '@zthun/works.core';
import { ZAlertSeverity } from '@zthun/works.message';
import { ZButtonComponentModel } from '@zthun/works.react';
import assert from 'assert';
import { fullPath, ZRouteAlerts } from '../../src/routes';
import { ZAlertsPageComponentModel } from '../../src/web-apps/components/alerts/alerts-page.cm';
import { ZLearnWorld } from '../learn-world';

const TIME = 10000;

Given('I navigate to the alert page', async function (this: ZLearnWorld<ZAlertsPageComponentModel>) {
  await this.navigate(fullPath(ZRouteAlerts));
  this.parameters.page = await this.create(ZAlertsPageComponentModel, ZAlertsPageComponentModel.Selector);
});

Given('I have checked the Immortal switch', async function (this: ZLearnWorld<ZAlertsPageComponentModel>) {
  const immortal = await this.parameters.page.immortal();
  await immortal.toggle(true);
});

Given('I have checked the Header switch', async function (this: ZLearnWorld<ZAlertsPageComponentModel>) {
  const header = await this.parameters.page.header();
  await header.toggle(true);
});

When('I click the {string} button', async function (this: ZLearnWorld<ZAlertsPageComponentModel>, button: string) {
  const btn: ZButtonComponentModel = await this.parameters.page[button]();
  await btn.click();
});

Then(
  'a {string} alert is displayed',
  async function (this: ZLearnWorld<ZAlertsPageComponentModel>, severity: ZAlertSeverity) {
    const [alert] = await (await this.parameters.page.alerts()).alerts();
    const actual = await alert.severity();
    assert.equal(actual, severity);
  }
);

Then('it automatically closes after a fixed interval', async function (this: ZLearnWorld<ZAlertsPageComponentModel>) {
  await sleep(TIME);
  const alerts = await (await this.parameters.page.alerts()).alerts();
  assert.equal(alerts.length, 0, `There should be no alerts after ${TIME / 1000} seconds.`);
});

Then('it does not close after a fixed interval', async function (this: ZLearnWorld<ZAlertsPageComponentModel>) {
  await sleep(TIME);
  const alerts = await (await this.parameters.page.alerts()).alerts();
  assert.ok(alerts.length > 0, `Immortal alerts should not close after ${TIME / 1000} seconds.`);
});

Then('it contains a header, {string}', async function (this: ZLearnWorld<ZAlertsPageComponentModel>, header: string) {
  const [alert] = await (await this.parameters.page.alerts()).alerts();
  const actual = await alert.header();
  assert.equal(actual, header);
});
