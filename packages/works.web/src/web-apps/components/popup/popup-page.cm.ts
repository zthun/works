import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZPopupButtonComponentModel } from '@zthun/works.react';

/**
 * Represents a component model for the popup page.
 */
export class ZPopupPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPopupPage-root';

  /**
   * Gets the popup button toggler.
   *
   * @returns
   *        The popup button that toggles the popup.
   */
  public toggler(): Promise<ZPopupButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZPopupButtonComponentModel);
  }
}
