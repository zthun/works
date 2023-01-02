import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZHomePageComponentModel } from '../../src/home/home-page.cm';
import { ZMicroservicesPageComponentModel } from '../../src/microservices/microservices-page.cm';
import { ZWebAppsPageComponentModel } from '../../src/web-apps/web-apps-page.cm';
import { ZLearnWorld } from '../learn-world';

Given('I navigate to the home page', async function (this: ZLearnWorld<ZHomePageComponentModel>) {
  await this.navigate('/home');
  this.parameters.page = await this.create(ZHomePageComponentModel, ZHomePageComponentModel.Selector);
});

When('I click the Get Started button under Web Apps', async function (this: ZLearnWorld<ZHomePageComponentModel>) {
  const { page } = this.parameters;
  await page.openWebApps();
});

Then('I am navigated to the Web Apps page', async function (this: ZLearnWorld<ZHomePageComponentModel>) {
  const webApps = await this.create(ZWebAppsPageComponentModel, ZWebAppsPageComponentModel.Selector);
  assert.ok(webApps);
});

When('I click the Get Started button under Microservices', async function (this: ZLearnWorld<ZHomePageComponentModel>) {
  const { page } = this.parameters;
  await page.openMicroservices();
});

Then('I am navigated to the Microservices page', async function (this: ZLearnWorld<ZHomePageComponentModel>) {
  const microservices = await this.create(ZMicroservicesPageComponentModel, ZMicroservicesPageComponentModel.Selector);
  assert.ok(microservices);
});
