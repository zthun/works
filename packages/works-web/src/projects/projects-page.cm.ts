import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZCardComponentModel, ZGridViewComponentModel } from '@zthun/fashion-boutique';

export class ZProjectsPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZProjectsPage-root';

  public asGrid(): ZGridViewComponentModel {
    return new ZGridViewComponentModel(this.driver);
  }

  public async project(id: string): Promise<ZCardComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZCardComponentModel, id);
  }
}
