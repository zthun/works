import { When } from '@cucumber/cucumber';
import { ZTypographyPageComponentModel } from '../../src/web-apps/components/typography/typography-page.cm';
import { ZLearnWorld } from '../learn-world';

interface IZTypographyPage {
  page: ZTypographyPageComponentModel;
}

When('I navigate to the typography demo page', async function (this: ZLearnWorld<IZTypographyPage>) {
  await this.navigate('/web-apps/components/typography');
  this.parameters.page = await this.create(ZTypographyPageComponentModel, ZTypographyPageComponentModel.Selector);
});
