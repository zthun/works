import { IZCircusDriver } from '../driver/circus-driver';
import { ZCircusComponentModel } from './circus-component-model';

export type ZCircusComponentFactory<T extends ZCircusComponentModel> = {
  Selector: string;
  new (driver: IZCircusDriver): T;
};

/**
 * Represents a by query language to query the driver by selectors.
 */
export abstract class ZCircusBy {
  /**
   * Queries the driver by a specific css selector.
   *
   * @param driver
   *        The root driver to query.
   * @param CircusComponentModel
   *        The model type to construct using the child driver.
   * @param selector
   *        The css target selector that describes the root of the
   *        CircusComponentModel
   *
   * @returns
   *        A new instance of CircusComponentModel.  If no target
   *        is found, then this method rejects with an Error.
   */
  public static async css<T extends ZCircusComponentModel>(
    driver: IZCircusDriver,
    CircusComponentModel: ZCircusComponentFactory<T>,
    selector: string
  ): Promise<T> {
    const description = `Searching for a component with selector: ${selector}`;
    await driver.wait(() => driver.peek(selector), description);
    const target = await driver.select(selector);
    return new CircusComponentModel(target);
  }

  /**
   * Returns the first discovered component model that matches the inner Selector.
   *
   * @param driver
   *        The driver to query.
   * @param CircusComponentModel
   *        The component model to construct.
   *
   * @returns
   *        A new instance of CircusComponentModel.  If no
   *        target is found, then this method rejects with an Error.
   */
  public static first<T extends ZCircusComponentModel>(
    driver: IZCircusDriver,
    CircusComponentModel: ZCircusComponentFactory<T>
  ): Promise<T> {
    return ZCircusBy.css(driver, CircusComponentModel, CircusComponentModel.Selector);
  }

  /**
   * Returns the first discovered component model that matches the inner Selector
   * along with a name attribute, or data-name attribute.
   *
   * @param driver
   *        The driver to query.
   * @param CircusComponentModel
   *        The component model to construct.
   * @param name
   *        The name or data-name value to query for.  If both name and
   *        data-name attributes are present, then only one needs to match.
   *
   * @returns
   *        A new instance of CircusComponentModel.  If no
   *        target is found, then this method rejects with an Error.
   */
  public static named<T extends ZCircusComponentModel>(
    driver: IZCircusDriver,
    CircusComponentModel: ZCircusComponentFactory<T>,
    name: string
  ): Promise<T> {
    const byNameAttribute = `${CircusComponentModel.Selector}[name="${name}"]`;
    const byDataNameAttribute = `${CircusComponentModel.Selector}[data-name="${name}"]`;
    const selector = `${byNameAttribute},${byDataNameAttribute}`;
    return ZCircusBy.css(driver, CircusComponentModel, selector);
  }
}
