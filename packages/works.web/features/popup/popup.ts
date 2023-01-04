import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { fullPath, ZRoutePopup } from '../../src/routes';
import { ZPopupPageComponentModel } from '../../src/web-apps/components/popup/popup-page.cm';
import { ZLearnWorld } from '../learn-world';

Given('I navigate to the popup demo page', async function (this: ZLearnWorld<ZPopupPageComponentModel>) {
  await this.open(fullPath(ZRoutePopup));
  this.parameters.page = await this.create(ZPopupPageComponentModel);
});

When('I click the toggler button on the popup demo page', async function (this: ZLearnWorld<ZPopupPageComponentModel>) {
  const { page } = this.parameters;
  await (await page.toggler()).open();
});

Then('the popup is opened on the popup demo page', async function (this: ZLearnWorld<ZPopupPageComponentModel>) {
  const { page } = this.parameters;
  const actual = await (await page.toggler()).opened();
  assert.ok(actual);
});
