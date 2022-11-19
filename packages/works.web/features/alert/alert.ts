import { Given, Then, When } from '@cucumber/cucumber';
import { sleep } from '@zthun/works.core';
import { ZAlertSeverity } from '@zthun/works.message';
import { ZAlertListComponentModel, ZButtonComponentModel } from '@zthun/works.react';
import assert from 'assert';
import { ZAlertsPageComponentModel } from '../../src/web-apps/components/alerts/alerts-page.cm';
import { ZLearnWorld } from '../learn-world';

interface IZAlertsPage {
  alerts: ZAlertListComponentModel;
  page: ZAlertsPageComponentModel;
}

const TIME = 10000;

Given('I navigate to the alert page', async function (this: ZLearnWorld<IZAlertsPage>) {
  await this.navigate('/web-apps/components/alerts');
  this.parameters.alerts = await this.create(ZAlertListComponentModel, ZAlertListComponentModel.Selector);
  this.parameters.page = await this.create(ZAlertsPageComponentModel, ZAlertsPageComponentModel.Selector);
});

Given('I have checked the Immortal switch', async function (this: ZLearnWorld<IZAlertsPage>) {
  const immortal = await this.parameters.page.immortal();
  await immortal.toggle(true);
});

Given('I have checked the Header switch', async function (this: ZLearnWorld<IZAlertsPage>) {
  const header = await this.parameters.page.header();
  await header.toggle(true);
});

When('I click the {string} button', async function (this: ZLearnWorld<IZAlertsPage>, button: string) {
  const btn: ZButtonComponentModel = await this.parameters.page[button]();
  await btn.click();
});

Then('a {string} alert is displayed', async function (this: ZLearnWorld<IZAlertsPage>, severity: ZAlertSeverity) {
  const [alert] = await this.parameters.alerts.alerts();
  const actual = await alert.severity();
  assert.equal(actual, severity);
});

Then('it automatically closes after a fixed interval', async function (this: ZLearnWorld<IZAlertsPage>) {
  await sleep(TIME);
  const alerts = await this.parameters.alerts.alerts();
  assert.equal(alerts.length, 0, `There should be no alerts after ${TIME / 1000} seconds.`);
});

Then('it does not close after a fixed interval', async function (this: ZLearnWorld<IZAlertsPage>) {
  await sleep(TIME);
  const alerts = await this.parameters.alerts.alerts();
  assert.ok(alerts.length > 0, `Immortal alerts should not close after ${TIME / 1000} seconds.`);
});

Then('it contains a header, {string}', async function (this: ZLearnWorld<IZAlertsPage>, header: string) {
  const [alert] = await this.parameters.alerts.alerts();
  const actual = await alert.header();
  assert.equal(actual, header);
});
