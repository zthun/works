import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';

/**
 * Represents a component model for a ZLink component.
 */
export class ZLinkComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZLink-root';

  /**
   * Gets the link hypertext reference (href).
   *
   * @returns
   *        The hypertext reference.
   */
  public reference() {
    return this.driver.attribute('href');
  }

  /**
   * Gets the name of the link.
   *
   * @returns
   *        The name of the link.
   */
  public name() {
    return this.driver.attribute('data-name');
  }

  /**
   * Gets the underlying link text.
   *
   * @returns
   *        The link text.
   */
  public label() {
    return this.driver.text();
  }

  /**
   * Clicks the link.
   */
  public async click() {
    return this.driver.perform(new ZCircusActBuilder().click().build());
  }
}
