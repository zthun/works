import { IZCircusDriver } from '@zthun/works.cirque';

/**
 * A component model for the ZLineItem.
 *
 * This mostly is just here to help you get the containers for the prefix, body, and suffix.
 */
export class ZLineItemLayoutComponentModel {
  public static readonly Selector = '.ZLineItemLayout-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param _driver
   *        The circus driver to manage the component.
   */
  public constructor(private _driver: IZCircusDriver) {}

  /**
   * Returns the prefix element.
   *
   * @returns
   *        The prefix element.
   */
  public prefix(): Promise<IZCircusDriver> {
    return this._driver.select('.ZLineItemLayout-prefix');
  }

  /**
   * Returns the body element.
   *
   * @returns
   *        The body element.
   */
  public body(): Promise<IZCircusDriver> {
    return this._driver.select('.ZLineItemLayout-body');
  }

  /**
   * Returns the suffix element.
   *
   * @returns
   *        The suffix element.
   */
  public suffix(): Promise<IZCircusDriver> {
    return this._driver.select('.ZLineItemLayout-suffix');
  }
}
