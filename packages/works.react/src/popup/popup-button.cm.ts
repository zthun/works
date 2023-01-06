import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZButtonComponentModel } from '../buttons/button.cm';
import { ZPopupComponentModel } from './popup.cm';

/**
 * Represents a component model for the popup button.
 */
export class ZPopupButtonComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPopupButton-root';

  /**
   * Retrieves the underlying button component.
   */
  public async button(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel);
  }

  /**
   * Determines if a popup has been opened.
   *
   * @returns
   *        True if a popup has been opened.
   */
  public async opened(): Promise<boolean> {
    return await (await this.driver.body()).peek(ZPopupComponentModel.Selector);
  }

  /**
   * Clicks the button and waits for the popup to open.
   *
   * @returns
   *        The component model that opened as a result of clicking the button.
   */
  public async open(): Promise<ZPopupComponentModel> {
    const button = await this.button();
    await button.click();
    const body = await this.driver.body();
    return ZCircusBy.first(body, ZPopupComponentModel);
  }
}
