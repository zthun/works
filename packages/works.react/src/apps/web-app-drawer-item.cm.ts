import { IZCircusPerformer, ZCircusActBuilder } from '@zthun/works.cirque';
import { required } from '@zthun/works.core';

/**
 * Represents a list of items in the web app drawer.
 */
export class ZWebAppDrawerItemComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The element that represents the item.
   * @param _performer
   *        The element responsible for clicking the item.
   */
  public constructor(private readonly _element: HTMLElement, private readonly _performer: IZCircusPerformer) {}

  /**
   * Gets the name of the item.
   *
   * @returns
   *        The name of the item.
   */
  public async name(): Promise<string | null> {
    const child = await required(this._element.querySelector('.MuiListItemText-primary'));
    return child.textContent;
  }

  /**
   * Gets the item id.
   *
   * @returns
   *        The item id.
   */
  public async id(): Promise<string> {
    return required(this._element.getAttribute('data-item-id'));
  }

  /**
   * Gets the item description.
   *
   * @returns
   *        The item description.
   */
  public async description(): Promise<string | null> {
    const child = await required(this._element.querySelector('.MuiListItemText-secondary'));
    return child.textContent;
  }

  /**
   * Gets the item type.
   *
   * @returns
   *        The item type.
   */
  public type(): Promise<string> {
    return required(this._element.getAttribute('data-item-type'));
  }

  /**
   * Clicks the item.
   *
   * @returns
   *        A promise that resolves once the item is clicked.
   */
  public click(): Promise<void> {
    const act = new ZCircusActBuilder().click(this._element).build();
    return this._performer.perform(act);
  }
}
