import { IZCircusDriver, ZCircusComponentModel } from '@zthun/works.cirque';
import { ZButtonComponentModel } from '../buttons/button.cm';

export type ZIdentityButtonState = 'authenticated' | 'unauthenticated' | 'loading';

/**
 * Represents a component model for the identity button.
 */
export class ZIdentityButtonComponentModel {
  public static readonly Selector = '.ZIdentityButton-root';

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
   *        The component model for the button.
   */
  public button(): Promise<ZButtonComponentModel> {
    return ZCircusComponentModel.create(this._driver, ZButtonComponentModel, ZButtonComponentModel.Selector);
  }

  /**
   * Gets whether the button is currently in the authenticated state.
   *
   * @returns
   *        True if the button is representing an authenticated state.
   */
  public async authenticated(): Promise<boolean> {
    const authenticated = await this._driver.attribute('data-authenticated');
    return authenticated === 'true';
  }
}
