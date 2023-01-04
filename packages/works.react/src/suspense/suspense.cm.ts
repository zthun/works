import { ZSizeFixed } from '@zthun/works.chonkify';
import { IZCircusDriver, ZCircusComponentModel } from '@zthun/works.cirque';

/**
 * Represents a component model for suspense.
 */
export class ZSuspenseComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZSuspense-root';

  /**
   * Gets the size of the suspense.
   *
   * @returns
   *        The size of the suspense.
   */
  public width(): Promise<ZSizeFixed> {
    return this.driver.attribute('data-width', ZSizeFixed.ExtraSmall);
  }

  /**
   * Gets whether there is suspense in a specific container.
   *
   * @param driver
   *        The driver that can contain the suspense.
   * @param name
   *        The optional name of the suspense to look for.
   *
   * @returns
   *        True if there exists a suspense in the driver.  If the name
   *        is supplied, then a targeted suspense is checked.
   */
  public static async loading(driver: IZCircusDriver, name?: string) {
    const query = name ? `${ZSuspenseComponentModel.Selector}[data-name="${name}"]` : ZSuspenseComponentModel.Selector;
    return driver.peek(query);
  }

  /**
   * Waits for the suspense component found in driver to finish loading.
   *
   * @param driver
   *        The driver that can contain the suspense.
   * @param name
   *        The targeted name of the suspense object.
   */
  public static async load(driver: IZCircusDriver, name?: string): Promise<void> {
    return driver.wait(() => ZSuspenseComponentModel.loading(driver, name).then((c) => !c));
  }
}
