import { IZCircusPerformer, ZCircusActBuilder } from '@zthun/works.cirque';
import { ZListItemComponentModel } from './list-item.cm';

/**
 * Represents a component model for a line item.
 */
export class ZListLineItemComponentModel {
  /**
   * The class that will be on the element for this item.
   */
  public static readonly ClassName = 'ZListLineItem-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param _item
   *        The item that overall represents the list line item.
   * @param _performer
   *        The performer to click on the item.
   */
  public constructor(private _item: ZListItemComponentModel, private _performer: IZCircusPerformer) {}

  /**
   * Gets the button if this item is clickable.
   *
   * @returns
   *        The element for the button, or null if
   *        the element is not clickable.
   */
  private _button(): Promise<HTMLElement | null> {
    return Promise.resolve(this._item.element.querySelector<HTMLElement>('.ZListLineItem-button'));
  }

  /**
   * Determines if this element is clickable.
   *
   * @returns
   *        True if the element can raise a click event,
   *        false otherwise.
   */
  public async clickable(): Promise<boolean> {
    const btn = await this._button();
    return !!btn;
  }

  /**
   * Clicks the underlying button if this item is clickable.
   */
  public async click(): Promise<void> {
    const btn = await this._button();

    if (!btn) {
      return;
    }

    const act = new ZCircusActBuilder().click(btn).build();
    await this._performer.perform(act);
  }
}
