import { IZCircusDriver, ZCircusComponentModel } from '@zthun/cirque';

/**
 * A component model for the ZLineItem.
 *
 * This mostly is just here to help you get the containers for the prefix, body, and suffix.
 */
export class ZLineItemLayoutComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZLineItemLayout-root';

  /**
   * Returns the prefix element.
   *
   * @returns
   *        The prefix element.
   */
  public prefix(): Promise<IZCircusDriver> {
    return this.driver.select('.ZLineItemLayout-prefix');
  }

  /**
   * Returns the body element.
   *
   * @returns
   *        The body element.
   */
  public body(): Promise<IZCircusDriver> {
    return this.driver.select('.ZLineItemLayout-body');
  }

  /**
   * Returns the suffix element.
   *
   * @returns
   *        The suffix element.
   */
  public suffix(): Promise<IZCircusDriver> {
    return this.driver.select('.ZLineItemLayout-suffix');
  }
}
