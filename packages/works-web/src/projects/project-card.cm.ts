import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZButtonComponentModel } from '@zthun/fashion-boutique';

export class ZProjectCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZProjectsPage-project';

  public async openUrl(): Promise<void> {
    const btn = await ZCircusBy.first(this.driver, ZButtonComponentModel, 'url');
    await btn.click();
  }

  public async openSource(): Promise<void> {
    const btn = await ZCircusBy.first(this.driver, ZButtonComponentModel, 'source');
    await btn.click();
  }
}
