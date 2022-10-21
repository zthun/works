import { IZCircusDriver, ZCircusActBuilder } from '@zthun/works.cirque';
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
   * @param item
   *        The item that is the abstraction of this item.
   */
  public constructor(public item: ZListItemComponentModel) {}

  /**
   * Gets the button if this item is clickable.
   *
   * @returns
   *        The element for the button, or null if
   *        the element is not clickable.
   */
  private async _button(): Promise<IZCircusDriver | null> {
    const [button] = await this.item.driver.query('.ZListLineItem-button');
    return button || null;
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

    const act = new ZCircusActBuilder().leftMouseClick().build();
    await btn.perform(act);
  }
}
