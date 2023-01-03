import { When } from '@cucumber/cucumber';
import { ZLearnPath } from '../../src/routes';
import { ZTypographyPageComponentModel } from '../../src/web-apps/components/typography/typography-page.cm';
import { ZLearnWorld } from '../learn-world';

When('I navigate to the typography demo page', async function (this: ZLearnWorld<ZTypographyPageComponentModel>) {
  await this.navigate(ZLearnPath.webApps.components.typography);
  this.parameters.page = await this.create(ZTypographyPageComponentModel, ZTypographyPageComponentModel.Selector);
});
