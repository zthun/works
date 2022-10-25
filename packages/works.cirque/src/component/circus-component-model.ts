import { IZCircusDriver } from '../driver/circus-driver';

/**
 * The standard component model constructor.
 */
export type ZCircusComponentModelConstructor<T> = new (driver: IZCircusDriver) => T;

/**
 * Represents a helper class to construct component models in a common way.
 */
export abstract class ZCircusComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param driver
   *        The driver that manages this component.
   */
  public constructor(public driver: IZCircusDriver) {}

  /**
   * Constructs a new CircusComponentModel by waiting for a context selector to become available.
   *
   * @param driver
   *        The driver used for the wait.
   * @param CircusComponentModel
   *        The component model constructor function to create.
   * @param selector
   *        The css selector to query for the root context of the component model.
   *
   * @returns
   *        A new instance of the CircusComponentModel once the selector context is ready.
   */
  public static async create<T>(
    driver: IZCircusDriver,
    CircusComponentModel: ZCircusComponentModelConstructor<T>,
    selector: string
  ) {
    await driver.wait(() => driver.peek(selector));
    const target = await driver.select(selector);
    return new CircusComponentModel(target);
  }
}
