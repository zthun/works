import { IZCircusDriver } from '@zthun/works.cirque';
import { ZListItemComponentModel } from './list-item.cm';

export type ZListItemConstructor<T> = new (originator: ZListItemComponentModel) => T;

/**
 * Represents a component model for a list.
 */
export class ZListComponentModel {
  public static readonly Selector = '.ZList-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param _driver
   *        The driver used to manage items in the component.
   */
  public constructor(private readonly _driver: IZCircusDriver) {}

  /**
   * Finds all underlying items and returns them.
   *
   * @returns
   *        All child items for this component model.
   */
  public async items(): Promise<ZListItemComponentModel[]> {
    const candidates = await this._driver.query(ZListItemComponentModel.Selector);
    const items = candidates.map((c) => new ZListItemComponentModel(c));
    return Promise.resolve(items);
  }

  /**
   * Finds the first item by a specific name.
   *
   * @param name
   *        The name of the item to search for.
   *
   * @returns
   *        The item with the given name or null if no such item exists.
   */
  public async item(name: string): Promise<ZListItemComponentModel | null> {
    const query = `${ZListItemComponentModel.Selector}[data-name="${name}"]`;
    const [item] = await this._driver.query(query);
    return item == null ? null : new ZListItemComponentModel(item);
  }
}
