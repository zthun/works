import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZButtonComponentModel } from '../buttons/button.cm';

/**
 * Represents the component model for the ZWebAppHomeButton.
 */
export class ZWebAppHomeButtonComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZWebAppHomeButton-root';

  /**
   * Gets the underlying button component.
   *
   * @returns
   *      The underlying button component.
   */
  public async button(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel);
  }

  /**
   * Gets the app name.
   *
   * @returns
   *        The app name.
   */
  public async name(): Promise<string | null | undefined> {
    const [name] = await this.driver.query('.ZWebAppHomeButton-name');
    return name?.text();
  }

  /**
   * Gets the description text.
   *
   * @returns
   *        The description text.
   */
  public async description(): Promise<string | null | undefined> {
    const [description] = await this.driver.query('.ZWebAppHomeButton-description');
    return description?.text();
  }
}
