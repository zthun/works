import { Given, Then, When } from '@cucumber/cucumber';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import assert from 'assert';
import { ZRouteSuspense, fullPath } from '../../src/routes';
import { ZSuspensePageComponentModel } from '../../src/web-apps/components/suspense/suspense-page.cm';
import { ZLearnWorld } from '../learn-world';

Given('I navigate to the suspense demo page', async function (this: ZLearnWorld<ZSuspensePageComponentModel>) {
  await this.open(fullPath(ZRouteSuspense));
  this.parameters.page = await this.create(ZSuspensePageComponentModel);
});

When(
  'I set the loading option to {string} on the suspense demo page',
  async function (this: ZLearnWorld<ZSuspensePageComponentModel>, value: 'checked' | 'unchecked') {
    const checked = value === 'checked';
    const { page } = this.parameters;
    const loading = await page.loading();
    await loading.toggle(checked);
  }
);

When(
  'I select the width, {string}, from the width drop down on the suspense demo page',
  async function (this: ZLearnWorld<ZSuspensePageComponentModel>, value: ZSizeFixed) {
    const { page } = this.parameters;
    const width = await page.width();
    await width.select(value);
  }
);

Then(
  'the width of the {string} suspense should be {string} on the suspense demo page',
  async function (this: ZLearnWorld<ZSuspensePageComponentModel>, name: 'rotate', width: ZSizeFixed) {
    const { page } = this.parameters;
    const suspense = await page[name]();
    const value = await suspense?.width();
    assert.equal(value, width);
  }
);

Then(
  'the {string} suspense should be {string} on the suspense demo page',
  async function (this: ZLearnWorld<ZSuspensePageComponentModel>, name: 'rotate', visibility: 'visible' | 'hidden') {
    const visible = visibility === 'visible';
    const { page } = this.parameters;
    const actual = await page[name]();
    assert.equal(!!actual, visible);
  }
);
