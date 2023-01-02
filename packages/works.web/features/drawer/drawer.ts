import { Then, When } from '@cucumber/cucumber';
import { ZStateAnchor } from '@zthun/works.react';
import assert from 'assert';
import { ZDrawerPageComponentModel } from '../../src/web-apps/components/drawer/drawer-page.cm';
import { ZLearnWorld } from '../learn-world';
import { ZLearnRoute } from '../routes';

When('I navigate to the drawer demo page', async function (this: ZLearnWorld<ZDrawerPageComponentModel>) {
  await this.navigate(ZLearnRoute.webApps.components.drawer);
  this.parameters.page = await this.create(ZDrawerPageComponentModel, ZDrawerPageComponentModel.Selector);
});

When(
  'I anchor the drawer to the {string} on the drawer demo page',
  async function (this: ZLearnWorld<ZDrawerPageComponentModel>, anchor: ZStateAnchor) {
    const { page } = this.parameters;
    await page.anchor(anchor);
  }
);

When(
  'I click the drawer button on the drawer demo page',
  async function (this: ZLearnWorld<ZDrawerPageComponentModel>) {
    const { page } = this.parameters;
    await (await page.drawerButton()).open();
  }
);

When(
  'I click the close button on the drawer on the drawer demo page',
  async function (this: ZLearnWorld<ZDrawerPageComponentModel>) {
    const { page } = this.parameters;
    const drawer = await (await page.drawerButton()).open();
    await page.close(drawer);
  }
);

Then(
  'the drawer is opened on the {string} on the drawer demo page',
  async function (this: ZLearnWorld<ZDrawerPageComponentModel>, anchor: ZStateAnchor) {
    const { page } = this.parameters;
    const btn = await page.drawerButton();
    const drawer = await btn.drawer();
    const actual = await drawer.anchor();
    assert.equal(actual, anchor);
  }
);

Then('the drawer is closed on the drawer demo page', async function (this: ZLearnWorld<ZDrawerPageComponentModel>) {
  const { page } = this.parameters;
  const actual = await (await page.drawerButton()).opened();
  assert.equal(actual, false);
});
