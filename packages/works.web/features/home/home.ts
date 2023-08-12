import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZHomePageComponentModel } from '../../src/home/home-page.cm';
import { ZMicroservicesPageComponentModel } from '../../src/microservices/microservices-page.cm';
import { ZRouteHome } from '../../src/routes';
import { ZLearnWorld } from '../learn-world';

type CardGetStarted = 'webApps' | 'microservices';

Given('I navigate to the home page', async function (this: ZLearnWorld<ZHomePageComponentModel>) {
  await this.open(ZRouteHome.path);
  this.parameters.page = await this.create(ZHomePageComponentModel);
});

When(
  'I click the Get Started button under {string} on the home page',
  async function (this: ZLearnWorld<ZHomePageComponentModel>, section: CardGetStarted) {
    const { page } = this.parameters;
    const button = await page[section]();
    await button.click();
  }
);

Then(
  'I am navigated to the Microservices page from the home page',
  async function (this: ZLearnWorld<ZHomePageComponentModel>) {
    const microservices = await this.create(ZMicroservicesPageComponentModel);
    assert.ok(microservices);
  }
);
