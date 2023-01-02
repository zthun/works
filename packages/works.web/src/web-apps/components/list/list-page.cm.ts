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
  public async alerts(): Promise<ZAlertListComponentModel> {
    return ZCircusComponentModel.create(
      await this.driver.body(),
      ZAlertListComponentModel,
      ZAlertListComponentModel.Selector
    );
  }

  /**
   * Gets the page list.
   *
   * @returns
   *      The page list.
   */
  public async list(): Promise<ZListComponentModel> {
    return ZCircusComponentModel.create(this.driver, ZListComponentModel, ZListComponentModel.Selector);
  }
}
