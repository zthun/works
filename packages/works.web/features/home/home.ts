import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZHomePageComponentModel } from '../../src/home/home-page.cm';
import { ZMicroservicesPageComponentModel } from '../../src/microservices/microservices-page.cm';
import { fullPath, ZRouteHome } from '../../src/routes';
import { ZWebAppsPageComponentModel } from '../../src/web-apps/web-apps-page.cm';
import { ZLearnWorld } from '../learn-world';

type CardGetStarted = 'webApps' | 'microservices';

Given('I navigate to the home page', async function (this: ZLearnWorld<ZHomePageComponentModel>) {
  await this.navigate(fullPath(ZRouteHome));
  this.parameters.page = await this.first(ZHomePageComponentModel);
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
  'I am navigated to the Web Apps page from the home page',
  async function (this: ZLearnWorld<ZHomePageComponentModel>) {
    const webApps = await this.first(ZWebAppsPageComponentModel);
    assert.ok(webApps);
  }
);

Then(
  'I am navigated to the Microservices page from the home page',
  async function (this: ZLearnWorld<ZHomePageComponentModel>) {
    const microservices = await this.first(ZMicroservicesPageComponentModel);
    assert.ok(microservices);
  }
);
