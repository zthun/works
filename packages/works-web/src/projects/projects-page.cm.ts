import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZGridViewComponentModel } from '@zthun/fashion-boutique';
import { ZProjectCardComponentModel } from './project-card.cm';

export class ZProjectsPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZProjectsPage-root';

  public asGrid(): ZGridViewComponentModel {
    return new ZGridViewComponentModel(this.driver);
  }

  public async projects(): Promise<ZProjectCardComponentModel[]> {
    return ZCircusBy.all(this.driver, ZProjectCardComponentModel);
  }

  public async project(id: string): Promise<ZProjectCardComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZProjectCardComponentModel, id);
  }
}
