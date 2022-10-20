import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { ZListItemComponentModel } from './list-item.cm';

export type ZListItemConstructor<T> = new (
  item: ZListItemComponentModel,
  performer: IZCircusPerformer,
  wait: IZCircusWait
) => T;

/**
 * Represents a component model for a list.
 */
export class ZListComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The element that contains the list component.
   * @param _performer
   *        The performer that is responsible for handling actions on list items.
   * @param _waiter
   *        The waiter that is responsible for waiting for events.
   */
  public constructor(
    private _element: HTMLElement,
    private _performer: IZCircusPerformer,
    private _waiter: IZCircusWait
  ) {}

  /**
   * Finds all underlying items and returns them.
   *
   * @returns
   *        All child items for this component model.
   */
  public items(): Promise<ZListItemComponentModel[]> {
    const candidates = ZListItemComponentModel.find(this._element);
    const items = candidates.map((c) => new ZListItemComponentModel(c));
    return Promise.resolve(items);
  }

  /**
   * Finds all items by a specific class.
   *
   * @param model
   *        The type of model to construct for each found class.
   * @param clasz
   *        The class to search for.
   *
   * @returns
   *        All child items that contain clasz.
   */
  public async itemsByClass<T>(model: ZListItemConstructor<T>, clasz: string): Promise<T[]> {
    const all = await this.items();
    return all
      .filter((a) => a.element.classList.contains(clasz))
      .map((m) => new model(m, this._performer, this._waiter));
  }

  /**
   * Searches for a component model that can be considered a ZListComponent model.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        The list of elements that can be used
   *        to represent a ZList component.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZList-root'));
  }
}
