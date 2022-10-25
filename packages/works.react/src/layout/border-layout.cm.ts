import { ZCircusComponentModel } from '@zthun/works.cirque';

/**
 * The component model for a border layout component.
 */
export class ZBorderLayoutComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBorderLayout-root';

  /**
   * Gets the border information.
   *
   * @returns
   *        The border information.
   */
  public async borderColor() {
    return this.driver.attribute('data-border-color');
  }

  /**
   * Gets the border size.
   *
   * @returns
   *         The border size.
   */
  public async borderSize() {
    return this.driver.attribute('data-border-size');
  }

  /**
   * Gets the border style.
   *
   * @returns
   *        The border style.
   */
  public async borderStyle() {
    return this.driver.attribute('data-border-style');
  }

  /**
   * Gets the background color information.
   *
   * @returns
   *        The background color information.
   */
  public async backgroundColor() {
    return this.driver.attribute('data-background-color');
  }
}
