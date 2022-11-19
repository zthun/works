import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZMicroservicesPageComponentModel } from 'works.web/src/microservices/microservices-page.cm';
import { ZHomePageComponentModel } from '../../src/home/home-page.cm';
import { ZWebAppsPageComponentModel } from '../../src/web-apps/web-apps-page.cm';
import { ZLearnWorld } from '../learn-world';

interface IZHome {
  home: ZHomePageComponentModel;
}

Given('I navigate to the home page', async function (this: ZLearnWorld<IZHome>) {
  await this.navigate('/home');
  this.parameters.home = await this.create(ZHomePageComponentModel, ZHomePageComponentModel.Selector);
});

When('I click the Get Started button under Web Apps', async function (this: ZLearnWorld<IZHome>) {
  const { home } = this.parameters;
  await home.openWebApps();
});

Then('I am navigated to the Web Apps page', async function (this: ZLearnWorld<IZHome>) {
  const webApps = await this.create(ZWebAppsPageComponentModel, ZWebAppsPageComponentModel.Selector);
  assert.ok(webApps);
});

When('I click the Get Started button under Microservices', async function (this: ZLearnWorld<IZHome>) {
  const { home } = this.parameters;
  await home.openMicroservices();
});

Then('I am navigated to the Microservices page', async function (this: ZLearnWorld<IZHome>) {
  const microservices = await this.create(ZMicroservicesPageComponentModel, ZMicroservicesPageComponentModel.Selector);
  assert.ok(microservices);
});
