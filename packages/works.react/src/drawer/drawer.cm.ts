import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/cirque';
import { ZStateAnchor } from '../theme/state-anchor';

/**
 * Represents the component model for a drawer.
 */
export class ZDrawerComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZDrawer-root';

  /**
   * Gets the paper element for an opened drawer.
   *
   * @returns The root element for where the drawer is opened.
   */
  public root(): Promise<IZCircusDriver> {
    return this.driver.select('.MuiDrawer-paper');
  }

  /**
   * Gets the drawer backdrop.
   *
   * @returns
   *      A element for the backdrop.
   */
  public backdrop(): Promise<IZCircusDriver> {
    return this.driver.select('.MuiBackdrop-root');
  }

  /**
   * Clicks the close button.
   *
   * Note that this does not wait for the drawer to close
   * as the drawer itself is controlled from the outside.
   *
   * @returns A promise that resolves once the button is clicked.
   */
  public async close() {
    const backdrop = await this.backdrop();
    const act = new ZCircusActBuilder().click().build();
    return backdrop.perform(act);
  }

  /**
   * Same as close, but uses the escape key instead of clicking on the backdrop.
   *
   * @returns A promise that resolves once the escape key is clicked.
   */
  public async escape() {
    const act = new ZCircusActBuilder().press(ZCircusKeyboardQwerty.escape).build();
    return this.driver.perform(act);
  }

  /**
   * Gets the current anchor position.
   *
   * @returns
   *    The state anchor for the drawer.
   */
  public async anchor(): Promise<ZStateAnchor> {
    return await this.driver.attribute<ZStateAnchor>('data-anchor', ZStateAnchor.Left);
  }
}
