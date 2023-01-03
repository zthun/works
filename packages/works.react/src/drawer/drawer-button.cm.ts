import { ZCircusBy, ZCircusComponentModel } from '@zthun/works.cirque';
import { ZButtonComponentModel } from '../buttons/button.cm';
import { ZDrawerComponentModel } from './drawer.cm';

/**
 * Represents the component model for a drawer button component.
 */
export class ZDrawerButtonComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZDrawerButton-root';

  /**
   * Gets the inner button.
   */
  private async _button() {
    return ZCircusBy.first(this.driver, ZButtonComponentModel);
  }

  /**
   * Gets a value that determines if this drawer is opened.
   *
   * @returns
   *        True if the drawer is open.  False otherwise.
   */
  public async opened(): Promise<boolean> {
    const body = await this.driver.body();
    return body.peek(ZDrawerComponentModel.Selector);
  }

  /**
   * Gets the currently opened drawer.
   *
   * @returns
   *        The opened drawer.  If the drawer is not opened,
   *        then the returned promise is rejected.
   */
  public async drawer(): Promise<ZDrawerComponentModel> {
    return ZCircusBy.first(await this.driver.body(), ZDrawerComponentModel);
  }

  /**
   * Opens the drawer.
   *
   * If the drawer is already opened, then the drawer is just returned and
   * this method does nothing.
   *
   * @returns
   *        The drawer component model for the open drawer.
   */
  public async open(): Promise<ZDrawerComponentModel> {
    const _opened = await this.opened();

    if (_opened) {
      return this.drawer();
    }

    const button = await this._button();
    await button.click();
    await this.driver.wait(() => this.opened());
    return this.drawer();
  }

  /**
   * Waits for the drawer to close.
   *
   * @returns
   *      A promise that resolves once the drawer is closed.
   */
  private _waitForClose() {
    return this.driver.wait(() => this.opened().then((open) => !open));
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
