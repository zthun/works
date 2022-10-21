import { IZCircusDriver, ZCircusComponentModel } from '@zthun/works.cirque';
import { ZButtonComponentModel } from '../buttons/button.cm';
import { ZDrawerComponentModel } from './drawer.cm';

/**
 * Represents the component model for a drawer button component.
 */
export class ZDrawerButtonComponentModel {
  public static readonly Selector = '.ZDrawerButton-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param _driver
   *        The driver that manages the component.
   */
  public constructor(private _driver: IZCircusDriver) {}

  /**
   * Gets the inner button.
   */
  private async _button() {
    return ZCircusComponentModel.create(this._driver, ZButtonComponentModel, ZButtonComponentModel.Selector);
  }

  /**
   * Gets a value that determines if this drawer is opened.
   *
   * @returns
   *        True if the drawer is open.  False otherwise.
   */
  public async opened(): Promise<boolean> {
    const body = await this._driver.body();
    return body.peek(ZDrawerComponentModel.Selector);
  }

  /**
   * Opens the drawer.
   *
   * @returns
   *        The drawer component model for the open drawer.
   */
  public async open(): Promise<ZDrawerComponentModel> {
    const button = await this._button();
    await button.click();
    await this._driver.wait(() => this.opened());
    const body = await this._driver.body();
    return ZCircusComponentModel.create(body, ZDrawerComponentModel, ZDrawerComponentModel.Selector);
  }

  /**
   * Waits for the drawer to close.
   *
   * @returns
   *      A promise that resolves once the drawer is closed.
   */
  private _waitForClose() {
    return this._driver.wait(() => this.opened().then((open) => !open));
  }

  /**
   * Closes the drawer and waits for it to close.
   *
   * @param drawer
   *        The drawer returned from open.
   */
  public async close(drawer: ZDrawerComponentModel) {
    await drawer.close();
    return this._waitForClose();
  }

  /**
   * Same as close, but uses the escape key instead.
   *
   * @param drawer
   *        The drawer returned from open.
   */
  public async escape(drawer: ZDrawerComponentModel) {
    await drawer.escape();
    return this._waitForClose();
  }
}
