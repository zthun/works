import { IZCircusDriver } from '@zthun/works.cirque';

/**
 * Represents a component model for a ZCard component.
 */
export class ZCardComponentModel {
  public static readonly Selector = '.ZCard-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param _driver
   *        The driver that manages the component.
   */
  public constructor(private _driver: IZCircusDriver) {}

  /**
   * Gets the text content of the heading.
   *
   * @returns
   *        The text content of the heading.
   */
  public async heading(): Promise<string | null> {
    const heading = await this._driver.select('.ZCard-header-heading');
    return heading.text();
  }

  /**
   * Gets the text content of the sub heading.
   *
   * @returns
   *        The text content of the sub heading.
   */
  public async subHeading(): Promise<string | null> {
    const subHeading = await this._driver.select('.ZCard-header-subheading');
    return subHeading.text();
  }

  /**
   * Gets the content area.
   *
   * @returns
   *        The driver to query the content area of the card.
   */
  public content(): Promise<IZCircusDriver> {
    return this._driver.select('.ZCard-content');
  }

  /**
   * Gets the footer area.
   *
   * @returns
   *        The driver to query the footer area of the card.
   *        Returns null if there is no footer.
   */
  public async footer(): Promise<IZCircusDriver | null> {
    const [footer] = await this._driver.query('.ZCard-footer');
    return footer || null;
  }
}
