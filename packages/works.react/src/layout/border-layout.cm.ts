import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';

/**
 * The component model for a border layout component.
 */
export class ZBorderLayoutComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBorderLayout-root';

  /**
   * Clicks the layout.
   *
   * @returns
   *        A promise that resolves once the layout has been clicked.
   */
  public click() {
    return this.driver.perform(new ZCircusActBuilder().click().build());
  }
}
