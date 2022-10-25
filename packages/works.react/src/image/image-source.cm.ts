import { IZCircusDriver } from '@zthun/works.cirque';

/**
 * Represents the component model for an image source.
 */
export class ZImageSourceComponentModel {
  public static readonly Selector = '.ZImageSource-root';
  /**
   * Initializes a new instance of this object.
   *
   * @param _driver
   *        The drivers that manages the component.
   */
  public constructor(private _driver: IZCircusDriver) {}

  /**
   * Gets the image name.
   *
   * @returns
   *        The name of the image.
   */
  public name(): Promise<string | null> {
    return this._driver.attribute('data-name');
  }

  /**
   * Gets a value that determines if this image is using an svg element.
   *
   * @returns
   *        True if the underlying image source is an svg.
   */
  public async svg(): Promise<boolean> {
    const [tag] = await this._driver.query('svg');
    return !!tag;
  }

  /**
   * Gets a value that determines if this image is using an img element.
   *
   * @returns
   *        True if the underlying image source is an img.
   */
  public async img(): Promise<boolean> {
    const [tag] = await this._driver.query('img');
    return !!tag;
  }

  /**
   * Gets a value that determines if the image is empty.
   *
   * @returns
   *        True if the underlying image is empty.
   */
  public async empty(): Promise<boolean> {
    const svg = await this.svg();
    const img = await this.img();
    return !svg && !img;
  }
}
