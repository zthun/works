import { When } from '@cucumber/cucumber';
import { ZTypographyPageComponentModel } from '../../src/web-apps/components/typography/typography-page.cm';
import { ZLearnWorld } from '../learn-world';
import { ZLearnRoute } from '../routes';

When('I navigate to the typography demo page', async function (this: ZLearnWorld<ZTypographyPageComponentModel>) {
  await this.navigate(ZLearnRoute.webApps.components.typography);
  this.parameters.page = await this.create(ZTypographyPageComponentModel, ZTypographyPageComponentModel.Selector);
});
