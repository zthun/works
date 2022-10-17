import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { required } from '@zthun/works.core';
import { first } from 'lodash';
import { ZDrawerButtonComponentModel } from '../drawer/drawer-button.cm';
import { ZWebAppDrawerItemComponentModel } from './web-app-drawer-item.cm';

/**
 * The component model for the ZWebAppDrawer
 */
export class ZWebAppDrawerComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The root element that contains the web
   *        app drawer.
   * @param _performer
   *        The circus perform responsible for opening
   *        the drawer and clicking items.
   * @param _waiter
   *        The circus wait responsible for waiting
   *        for items to be ready.
   */
  public constructor(
    private readonly _element: HTMLElement,
    private readonly _performer: IZCircusPerformer,
    private readonly _waiter: IZCircusWait
  ) {}

  /**
   * Gets the underlying button responsible for opening the drawer.
   *
   * @returns
   *        The underlying drawer button.
   */
  public async button(): Promise<ZDrawerButtonComponentModel> {
    const root = await required(first(ZDrawerButtonComponentModel.find(this._element)));
    return new ZDrawerButtonComponentModel(root, this._performer, this._waiter);
  }

  /**
   * Opens the drawer and returns all of the items in the drawer.
   *
   * This is a shortcut to retrieving the button, clicking it,
   * waiting for all web apps and the home button to load,
   * and searching the open drawer for the web app items.
   *
   * @returns
   *        The list of drawer items.
   */
  public async open(): Promise<ZWebAppDrawerItemComponentModel[]> {
    const button = await this.button();
    const drawer = await button.open();
    const container = await drawer.root();
    await this._waiter.wait(() => !container.querySelector('.ZCircularProgress-root'));
    const candidates = container.querySelectorAll<HTMLElement>('.ZWebAppDrawer-item');
    const items = Array.from(candidates);
    return items.map((item) => new ZWebAppDrawerItemComponentModel(item, this._performer));
  }

  /**
   * Finds a specific item with a given id or name.
   *
   * @param items
   *        The list of items to search.
   * @param idOrName
   *        The id of the item to find.
   *
   * @returns
   *        The item with the given id, or null if no such item exists.
   */
  private async _findItemByIdOrName(items: ZWebAppDrawerItemComponentModel[], idOrName: string) {
    let index: number;

    const ids = await Promise.all(items.map((item) => item.id()));
    index = ids.indexOf(idOrName);

    if (index >= 0) {
      return items[index];
    }

    const names = await Promise.all(items.map((item) => item.name()));
    index = names.indexOf(idOrName);

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
    const items = await this.open();
    const types = await Promise.all(items.map((item) => item.type()));
    return items.filter((_, i) => types[i] === type);
  }

  /**
   * Opens the drawer and returns an item with a given id.
   *
   * Note that the id for a route is it's path.
   *
   * @param idOrName
   *        The id of the item to find.
   *
   * @returns
   *        The item with the given id, or null if no such item exists.
   */
  public async item(idOrName: string): Promise<ZWebAppDrawerItemComponentModel | null> {
    const items = await this.open();
    return this._findItemByIdOrName(items, idOrName);
  }

  /**
   * Returns the home item.
   *
   * @returns
   *        The home item.
   */
  public async home(): Promise<ZWebAppDrawerItemComponentModel> {
    const items = await this._findItemsByType('home');
    return required(first(items));
  }

  /**
   * Returns the app items.
   *
   * @returns
   *        The app items.
   */
  public async apps(): Promise<ZWebAppDrawerItemComponentModel[]> {
    return this._findItemsByType('app');
  }

  /**
   * Finds a specific route by id or name.
   *
   * @param idOrName The id or name of the app.
   *
   * @returns
   *      The item for the app with the given id or name or null
   *      if no such app exists.
   */
  public async app(idOrName: string): Promise<ZWebAppDrawerItemComponentModel | null> {
    const items = await this.apps();
    return this._findItemByIdOrName(items, idOrName);
  }

  /**
   * Returns the route items.
   *
   * @returns
   *        The route items.
   */
  public async routes(): Promise<ZWebAppDrawerItemComponentModel[]> {
    return this._findItemsByType('route');
  }

  /**
   * Finds a specific route by path or name.
   *
   * @param pathOrName
   *        The path or name of the route.
   *
   * @returns
   *        The item for the route or null if no such item exists.
   */
  public async route(pathOrName: string): Promise<ZWebAppDrawerItemComponentModel | null> {
    const items = await this.routes();
    return this._findItemByIdOrName(items, pathOrName);
  }

  /**
   * Returns the source item if it exists.
   *
   * @returns
   *        The source item or null if the home app did not have a source link.
   */
  public async source(): Promise<ZWebAppDrawerItemComponentModel | null> {
    const items = await this._findItemsByType('source');
    return first(items) || null;
  }

  /**
   * Finds a set of HTMLElement objects that can be considered ZWebAppDrawer components.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        The list of candidate elements that can be considered
   *        ZWebAppDrawerComponentModel objects.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZWebAppDrawer-root'));
  }
}
