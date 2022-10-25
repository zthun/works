import { ZCircusComponentModel } from '@zthun/works.cirque';
import { required } from '@zthun/works.core';
import { first } from 'lodash';
import { ZDrawerButtonComponentModel } from '../drawer/drawer-button.cm';
import { ZListLineItemComponentModel } from '../list/list-line-item.cm';
import { ZListComponentModel } from '../list/list.cm';
import { ZSuspenseComponentModel } from '../suspense/suspense.cm';

/**
 * The component model for the ZWebAppDrawer
 */
export class ZWebAppDrawerComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZWebAppDrawer-root';

  /**
   * Gets the underlying button responsible for opening the drawer.
   *
   * @returns
   *        The underlying drawer button.
   */
  public async button(): Promise<ZDrawerButtonComponentModel> {
    return ZCircusComponentModel.create(this.driver, ZDrawerButtonComponentModel, ZDrawerButtonComponentModel.Selector);
  }

  /**
   * Opens the drawer and returns the underlying list items.
   *
   * @returns
   *        The underlying list items.
   */
  public async open(): Promise<ZListLineItemComponentModel[]> {
    const button = await this.button();
    const drawer = await button.open();
    const container = await drawer.root();
    await ZSuspenseComponentModel.load(container);
    const list = await ZCircusComponentModel.create(container, ZListComponentModel, ZListComponentModel.Selector);
    const items = await list.items();
    return items.map((i) => new ZListLineItemComponentModel(i));
  }

  /**
   * Finds a specific item with a given name or text.
   *
   * @param items
   *        The list of items to search.
   * @param nameOrHeading
   *        The item with the given name or heading text to find.
   *
   * @returns
   *        The item with the given name attribute or heading text.
   *        Returns null if no such item exists.
   */
  private async _findItemByNameOrHeading(items: ZListLineItemComponentModel[], nameOrHeading: string) {
    let index: number;

    const names = await Promise.all(items.map((lineItem) => lineItem.item.name()));
    index = names.indexOf(nameOrHeading);

    if (index >= 0) {
      return items[index];
    }

    const headings = await Promise.all(items.map((lineItem) => lineItem.heading()));
    index = headings.indexOf(nameOrHeading);

    if (index >= 0) {
      return items[index];
    }

    return null;
  }

  /**
   * Shortcut to open and then filtering all items by a specific type.
   *
   * @param type
   *        The type to search for.
   *
   * @returns
   *        All items that are of the specified types.
   */
  private async _findItemsByType(type: 'home' | 'app' | 'route' | 'source') {
    const clasz = `ZWebAppDrawer-item-${type}`;
    const items = await this.open();
    const classLists = await Promise.all(items.map((lineItem) => lineItem.item.driver.classes([clasz])));
    const classes = classLists.map((c) => first(c));
    return items.filter((_, i) => classes[i] != null);
  }

  /**
   * Opens the drawer and returns an item with a given id.
   *
   * Note that the id for a route is it's path.
   *
   * @param nameOrHeading
   *        The item with the given name or heading text to find.
   *
   * @returns
   *        The item with the given id, or null if no such item exists.
   */
  public async item(nameOrHeading: string): Promise<ZListLineItemComponentModel | null> {
    const items = await this.open();
    return this._findItemByNameOrHeading(items, nameOrHeading);
  }

  /**
   * Returns the home item.
   *
   * @returns
   *        The home item.
   */
  public async home(): Promise<ZListLineItemComponentModel> {
    const items = await this._findItemsByType('home');
    return required(first(items));
  }

  /**
   * Returns the app items.
   *
   * @returns
   *        The app items.
   */
  public async apps(): Promise<ZListLineItemComponentModel[]> {
    return this._findItemsByType('app');
  }

  /**
   * Finds a specific app by id or name.
   *
   * @param nameOrHeading
   *        The item with the given name or heading text to find.
   *
   * @returns
   *      The item for the app with the given id or name or null
   *      if no such app exists.
   */
  public async app(nameOrHeading: string): Promise<ZListLineItemComponentModel | null> {
    const items = await this.apps();
    return this._findItemByNameOrHeading(items, nameOrHeading);
  }

  /**
   * Returns the source item if it exists.
   *
   * @returns
   *        The source item or null if the home app did not have a source link.
   */
  public async source(): Promise<ZListLineItemComponentModel | null> {
    const items = await this._findItemsByType('source');
    return first(items) || null;
  }
}
