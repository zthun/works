import { IZCircusDriver } from '@zthun/works.cirque';

/**
 * Represents a component model for a single item underneath a ZList.
 */
export class ZListItemComponentModel {
  public static readonly Selector = '.ZListItem-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param driver
   *        The driver to manage the component model.
   */
  public constructor(public readonly driver: IZCircusDriver) {}

  /**
   * Gets the name of the list item.
   *
   * @returns
   *      The name of the list item.
   */
  public name(): Promise<string | null> {
    return this.driver.attribute('data-name');
  }
}
