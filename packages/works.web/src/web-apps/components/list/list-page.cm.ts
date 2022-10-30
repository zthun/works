import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZAlertListComponentModel, ZListComponentModel } from '@zthun/works.react';

/**
 * The component model for the list page.
 */
export class ZListPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZListPage-root';

  /**
   * Gets the alerts on the page.
   *
   * @returns
   *      The page alerts.
   */
  public async alertList(): Promise<ZAlertListComponentModel> {
    const root = await this.driver.select(ZAlertListComponentModel.Selector);
    return new ZAlertListComponentModel(root);
  }

  /**
   * Gets the page list.
   *
   * @returns
   *      The page list.
   */
  public async list(): Promise<ZListComponentModel> {
    const root = await this.driver.select(ZListComponentModel.Selector);
    return new ZListComponentModel(root);
  }
}
