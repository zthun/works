import { IZCircusDriver } from '@zthun/works.cirque';
import { ZAlertListComponentModel, ZListComponentModel } from '@zthun/works.react';

/**
 * The component model for the list page.
 */
export class ZListPageComponentModel {
  public static readonly Selector = '.ZListPage-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param _driver
   *        The circus driver to manage the page.
   */
  public constructor(private _driver: IZCircusDriver) {}

  /**
   * Gets the alerts on the page.
   *
   * @returns
   *      The page alerts.
   */
  public async alerts(): Promise<ZAlertListComponentModel> {
    const root = await this._driver.select(ZAlertListComponentModel.Selector);
    return new ZAlertListComponentModel(root);
  }

  /**
   * Gets the page list.
   *
   * @returns
   *      The page list.
   */
  public async list(): Promise<ZListComponentModel> {
    const root = await this._driver.select(ZListComponentModel.Selector);
    return new ZListComponentModel(root);
  }
}
