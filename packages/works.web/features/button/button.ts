import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZButtonPageComponentModel } from '../../src/web-apps/components/button/button-page.cm';
import { ZLearnWorld } from '../learn-world';

interface IZButtonPage {
  page: ZButtonPageComponentModel;
}

Given('I navigate to the button demo page', async function (this: ZLearnWorld<IZButtonPage>) {
  await this.navigate('/web-apps/components/button');
  this.parameters.page = await this.create(ZButtonPageComponentModel, ZButtonPageComponentModel.Selector);
});

When(
  'I click the {string} button on the button page',
  async function (this: ZLearnWorld<IZButtonPage>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    await button.click();
  }
);

When(
  'I check the {string} option on the button page',
  async function (this: ZLearnWorld<IZButtonPage>, name: 'disabled' | 'loading' | 'outline' | 'borderless') {
    const option = await this.parameters.page[name]();
    await option.toggle(true);
  }
);

When(
  'I select the {string} fashion option on the button page',
  async function (this: ZLearnWorld<IZButtonPage>, fashion: string) {
    const choice = await this.parameters.page.fashion();
    await choice.select(fashion);
  }
);

Then('an alert should be displayed on the button page', async function (this: ZLearnWorld<IZButtonPage>) {
  const alerts = await this.parameters.page.alerts();
  const actual = (await alerts.alerts()).length;
  assert.equal(actual, 1);
});

Then(
  'the {string} button should be disabled on the button page',
  async function (this: ZLearnWorld<IZButtonPage>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    const actual = await button.disabled();
    assert.equal(actual, true);
  }
);

Then(
  'the {string} button should be loading on the button page',
  async function (this: ZLearnWorld<IZButtonPage>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    const actual = await button.loading();
    assert.equal(actual, true);
  }
);

Then(
  'the {string} button should be outlined on the button page',
  async function (this: ZLearnWorld<IZButtonPage>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    const actual = await button.outlined();
    assert.equal(actual, true);
  }
);

Then(
  'the {string} button should be borderless on the button page',
  async function (this: ZLearnWorld<IZButtonPage>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    const actual = await button.borderless();
    assert.equal(actual, true);
  }
);

Then(
  'the fashion on the {string} button should be {string}',
  async function (this: ZLearnWorld<IZButtonPage>, name: 'button' | 'iconButton', fashion: string) {
    const button = await this.parameters.page[name]();
    const actual = await button.fashion();
    assert.equal(actual, fashion);
  }
);
