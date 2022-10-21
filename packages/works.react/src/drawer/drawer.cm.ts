import { IZCircusDriver, ZCircusActBuilder } from '@zthun/works.cirque';

/**
 * Represents the component model for a drawer.
 */
export class ZDrawerComponentModel {
  public static readonly Selector = '.ZDrawer-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param _driver
   *        The driver to manage the component.
   */
  public constructor(private readonly _driver: IZCircusDriver) {}

  /**
   * Gets the paper element for an opened drawer.
   *
   * @returns The root element for where the drawer is opened.
   */
  public root(): Promise<IZCircusDriver> {
    return this._driver.select('.MuiDrawer-paper');
  }

  /**
   * Gets the drawer backdrop.
   *
   * @returns
   *      A element for the backdrop.
   */
  public backdrop(): Promise<IZCircusDriver> {
    return this._driver.select('.MuiBackdrop-root');
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
    const act = new ZCircusActBuilder().keysClick('[Escape]').build();
    return this._driver.perform(act);
  }
}
