import { Then, When } from '@cucumber/cucumber';
import { ZHue, ZShade } from '@zthun/works.fashion';
import assert from 'assert';
import { fullPath, ZRouteFashion } from '../../src/routes';
import { ZFashionPageComponentModel } from '../../src/web-apps/components/fashion/fashion-page.cm';
import { ZLearnWorld } from '../learn-world';

When('I navigate to the fashion demo page', async function (this: ZLearnWorld<ZFashionPageComponentModel>) {
  await this.open(fullPath(ZRouteFashion));
  this.parameters.page = await this.create(ZFashionPageComponentModel);
});

When(
  'I select the color, {string}, with a shade of {string} on the fashion demo page',
  async function (this: ZLearnWorld<ZFashionPageComponentModel>, hue: ZHue, _shade: string) {
    const { page } = this.parameters;
    const grid = await page.grid();
    const shade: ZShade = +_shade as ZShade;
    const block = await grid.get(hue, shade);
    await block?.click();
  }
);

Then(
  'the selected color value should be {string} on the fashion demo page',
  async function (this: ZLearnWorld<ZFashionPageComponentModel>, color: string) {
    const { page } = this.parameters;
    const actual = await page.value();
    assert.equal(actual, color);
  }
);
