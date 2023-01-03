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
  public constructor(public readonly driver: IZCircusDriver) {}
}
