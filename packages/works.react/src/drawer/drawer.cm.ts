import { IZCircusPerformer, ZCircusActBuilder } from '@zthun/works.cirque';
import { required } from '@zthun/works.core';

/**
 * Represents the component model for a drawer.
 */
export class ZDrawerComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The element that represents the drawer.
   * @param _performer
   *        The performer that is responsible for closing
   *        the drawer.
   */
  public constructor(private readonly _element: HTMLElement, private readonly _performer: IZCircusPerformer) {}

  /**
   * Gets the paper element for an opened drawer.
   *
   * @returns The root element for where the drawer is opened.
   */
  public root(): Promise<HTMLElement> {
    return required(this._element.querySelector<HTMLElement>('.MuiDrawer-paper'));
  }

  /**
   * Gets the drawer backdrop.
   *
   * @returns
   *      A element for the backdrop.
   */
  public backdrop(): Promise<HTMLElement> {
    return required(this._element.querySelector<HTMLElement>('.MuiBackdrop-root'));
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
    const act = new ZCircusActBuilder().click(backdrop).build();
    return this._performer.perform(act);
  }

  /**
   * Same as close, but uses the escape key instead of clicking on the backdrop.
   *
   * @returns A promise that resolves once the escape key is clicked.
   */
  public async escape() {
    const act = new ZCircusActBuilder().keysClick('[Escape]').build();
    return this._performer.perform(act);
  }

  /**
   * Finds all possible elements that can be ZDrawer components.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        A list of candidate elements that can be considered
   *        drawer components.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZDrawer-root'));
  }
}
