import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { required, sleep } from '@zthun/works.core';
import { ZButtonComponentModel } from '../buttons/button.cm';
import { ZDrawerComponentModel } from './drawer.cm';

/**
 * Represents the component model for a drawer button component.
 */
export class ZDrawerButtonComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The element that represents the button.
   * @param _performer
   *        The performer used to click the button.
   * @param _waiter
   *        The waiter used to wait for the drawer to open.
   */
  public constructor(
    private readonly _element: HTMLElement,
    private readonly _performer: IZCircusPerformer,
    private readonly _waiter: IZCircusWait
  ) {}

  /**
   * Gets the inner button.
   */
  private async _button() {
    const inner = await required(this._element.querySelector<HTMLButtonElement>('.ZButton-root'));
    return new ZButtonComponentModel(inner, this._performer, this._waiter);
  }

  /**
   * Gets a value that determines if this drawer is opened.
   *
   * @returns
   *        True if the drawer is open.  False otherwise.
   */
  private _opened() {
    return !!ZDrawerComponentModel.find(document.body).length;
  }

  /**
   * Gets a value that determines if this drawer is opened.
   *
   * @returns
   *        True if the drawer is open.  False otherwise.
   */
  public opened(): Promise<boolean> {
    return Promise.resolve(this._opened());
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
    this._waiter.wait(() => this._opened());
    const [drawer] = ZDrawerComponentModel.find(document.body);
    return new ZDrawerComponentModel(drawer, this._performer);
  }

  /**
   * Waits for the drawer to close.
   *
   * @returns
   *      A promise that resolves once the drawer is closed.
   */
  private async _waitForClose() {
    await sleep(500);
    return this._waiter.wait(() => !this._opened());
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

  /**
   * Finds all elements that can be considered drawer buttons.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        The list of candidates that can be considered drawer buttons.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZDrawerButton-root'));
  }
}
