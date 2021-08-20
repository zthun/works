import { ReactNode } from 'react-markdown';
import { IZTopBarItem } from './top-bar-item.interface';

/**
 * Represents a builder for a top bar item.
 *
 * @deprecated Just use the top nav
 */
export class ZTopBarItemBuilder {
  private _item: IZTopBarItem;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._item = {
      headerText: null
    };
  }

  /**
   * Sets the optional avatar.
   *
   * @param val The value to set.
   *
   * @returns A reference to this object.
   */
  public avatar(val: ReactNode) {
    this._item.avatar = val;
    return this;
  }

  /**
   * Sets the optional subheader text.
   *
   * @param val The value to set.
   *
   * @returns A reference to this object.
   */
  public subHeaderText(val: string) {
    this._item.subHeaderText = val;
    return this;
  }

  /**
   * Constructs a routed item.
   *
   * @param route The route to move to.
   * @param headerText The name of the item.
   * @param avatar The item avatar.
   * @param subHeaderText The optional subheader text.
   *
   * @returns A reference to this object.
   */
  public route(route: string, headerText: string): this {
    this._item.route = route;
    this._item.headerText = headerText;
    return this;
  }

  /**
   * Constructs a link item.
   *
   * @param url The url to open.
   * @param headerText The text for the item.
   * @param target The link target.  The default is _blank if this is falsy.
   *
   * @returns A reference to this object.
   */
  public link(url: string, headerText: string, target?: string): this {
    this._item.link = url;
    this._item.headerText = headerText;
    this._item.target = target;
    return this;
  }

  /**
   * Sets the separator flag to true.
   *
   * @returns A reference to this object.
   */
  public separator(): this {
    this._item.separator = true;
    this._item.headerText = null;
    delete this._item.subHeaderText;
    delete this._item.avatar;
    return this;
  }

  /**
   * Returns a shallow copy of the built item.
   *
   * @returns A shallow copy of the built item.
   */
  public build(): IZTopBarItem {
    return { ...this._item };
  }
}
