import { IZCircusDriver, ZCircusComponentModel } from '@zthun/works.cirque';
import { ZButtonComponentModel } from '../buttons/button.cm';

/**
 * Represents the component model for the ZWebAppHomeButton.
 */
export class ZWebAppHomeButtonComponentModel {
  public static readonly Selector = '.ZWebAppHomeButton-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param _driver
   *        The driver that manages the component.
   */
  public constructor(private readonly _driver: IZCircusDriver) {}

  /**
   * Gets the underlying button component.
   *
   * @returns
   *      The underlying button component.
   */
  public async button(): Promise<ZButtonComponentModel> {
    return ZCircusComponentModel.create(this._driver, ZButtonComponentModel, '.ZWebAppHomeButton-button');
  }

  /**
   * Gets the app name.
   *
   * @returns
   *        The app name.
   */
  public async name(): Promise<string | null | undefined> {
    const [name] = await this._driver.query('.ZWebAppHomeButton-name');
    return name?.text();
  }

  /**
   * Gets the description text.
   *
   * @returns
   *        The description text.
   */
  public async description(): Promise<string | null | undefined> {
    const [description] = await this._driver.query('.ZWebAppHomeButton-description');
    return description?.text();
  }
}
