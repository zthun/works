import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZBooleanComponentModel, ZChoiceComponentModel, ZSuspenseComponentModel } from '@zthun/works.react';

/**
 * Represents the component model for the suspense page.
 */
export class ZSuspensePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZSuspensePage-root';

  /**
   * Gets the rotate loader on the page, or null if there is no suspense.
   *
   * @returns The current suspense loader.
   */
  public rotate(): Promise<ZSuspenseComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZSuspenseComponentModel);
  }

  /**
   * Gets the loading option.
   *
   * @returns
   *        The loading option.
   */
  public loading(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'loading');
  }

  /**
   * Gets the width drop down.
   *
   * @returns
   *        The width drop down.
   */
  public width(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'width');
  }
}
