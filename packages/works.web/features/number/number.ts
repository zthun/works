import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { fullPath, ZRouteNumber } from '../../src/routes';
import { ZNumberPageComponentModel } from '../../src/web-apps/components/number/number-page.cm';
import { ZLearnWorld } from '../learn-world';

type NumberDemoTarget = 'spinner';
type Direction = 'increment' | 'decrement';

Given(
  'I start with a value of {string} on the number demo page',
  async function (this: ZLearnWorld<ZNumberPageComponentModel>, value: string) {
    const { page } = this.parameters;
    const spinner = await page.spinner();
    await spinner.clear();
    await spinner.keyboard(value);
  }
);

When('I navigate to the number demo page', async function (this: ZLearnWorld<ZNumberPageComponentModel>) {
  await this.open(fullPath(ZRouteNumber));
  this.parameters.page = await this.create(ZNumberPageComponentModel);
});

When(
  'I clear the {string} input on the number demo page',
  async function (this: ZLearnWorld<ZNumberPageComponentModel>, name: NumberDemoTarget) {
    const { page } = this.parameters;
    const num = await page[name]();
    await num.clear();
  }
);

When(
  'I {string} the value of the {string} input by {string} on the number demo page',
  async function (
    this: ZLearnWorld<ZNumberPageComponentModel>,
    direction: Direction,
    name: NumberDemoTarget,
    step: string
  ) {
    const { page } = this.parameters;
    const num = await page[name]();
    await num[direction](+step);
  }
);

Then(
  'the value should be cleared on the number demo page',
  async function (this: ZLearnWorld<ZNumberPageComponentModel>) {
    const { page } = this.parameters;
    const actual = await page.value();
    assert.equal(actual, null);
  }
);

Then(
  'the value should be {string} on the number demo page',
  async function (this: ZLearnWorld<ZNumberPageComponentModel>, _expected: string) {
    const { page } = this.parameters;
    const expected = +_expected;
    const actual = await page.value();
    assert.equal(actual, expected);
  }
);
