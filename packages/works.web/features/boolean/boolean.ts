import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZBooleanPageComponentModel } from '../../src/web-apps/components/boolean/boolean-page.cm';
import { ZLearnWorld } from '../learn-world';

interface IZBooleanPage {
  page: ZBooleanPageComponentModel;
}

Given('I have navigated to the boolean demo page', async function (this: ZLearnWorld<IZBooleanPage>) {
  await this.navigate('/web-apps/components/boolean');
  this.parameters.page = await this.create(ZBooleanPageComponentModel, ZBooleanPageComponentModel.Selector);
});

When(
  'I click on the {string} while it is {string} on the boolean page',
  async function (
    this: ZLearnWorld<IZBooleanPage>,
    demo: 'checkbox' | 'switch',
    state: 'off' | 'on' | 'indeterminate'
  ) {
    const { page } = this.parameters;
    const bool = await page[demo]();
    const starting = await page[state]();
    await starting.click();
    await bool.toggle();
  }
);

When(
  'I click the {string} button on the boolean page',
  async function (this: ZLearnWorld<IZBooleanPage>, state: 'on' | 'off' | 'indeterminate') {
    const { page } = this.parameters;
    const button = await page[state]();
    await button.click();
  }
);

When(
  'I toggle the switch for the disabled option to {string} on the boolean page',
  async function (this: ZLearnWorld<IZBooleanPage>, value: 'on' | 'off') {
    const { page } = this.parameters;
    const disabled = await page.disabled();
    const to = value === 'on';
    await disabled.toggle(to);
  }
);

Then(
  'all demo components are checked {string} on the boolean page',
  async function (this: ZLearnWorld<IZBooleanPage>, checked: 'on' | 'off') {
    const { page } = this.parameters;
    const checkbox = await page.checkbox();
    const switcher = await page.switch();
    const expected = checked === 'on';
    const checkboxValue = await checkbox.value();
    const switchValue = await switcher.value();
    assert.equal(checkboxValue, expected);
    assert.equal(switchValue, expected);
  }
);

Then(
  'all demo components are disabled {string} on the boolean page',
  async function (this: ZLearnWorld<IZBooleanPage>, value: 'on' | 'off') {
    const { page } = this.parameters;
    const checkbox = await page.checkbox();
    const switcher = await page.switch();
    const expected = value === 'on';
    const checkboxDisabled = await checkbox.disabled();
    const switchDisabled = await switcher.disabled();
    assert.equal(checkboxDisabled, expected);
    assert.equal(switchDisabled, expected);
  }
);

Then(
  'all demo components that support the indeterminate state on the page are indeterminate',
  async function (this: ZLearnWorld<IZBooleanPage>) {
    const { page } = this.parameters;
    const checkbox = await page.checkbox();
    const value = await checkbox.value();
    assert.equal(value, null);
  }
);

Then(
  'all demo components that do not support the indeterminate state on the page are off',
  async function (this: ZLearnWorld<IZBooleanPage>) {
    const { page } = this.parameters;
    const switcher = await page.switch();
    const value = await switcher.value();
    assert.equal(value, false);
  }
);