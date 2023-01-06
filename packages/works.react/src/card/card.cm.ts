import { IZCircusDriver, ZCircusComponentModel } from '@zthun/cirque';

/**
 * Represents a component model for a ZCard component.
 */
export class ZCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZCard-root';

  /**
   * Gets the text content of the heading.
   *
   * @returns
   *        The text content of the heading.
   */
  public async heading(): Promise<string> {
    const heading = await this.driver.select('.ZCard-header-heading');
    return heading.text();
  }

  /**
   * Gets the text content of the sub heading.
   *
   * @returns
   *        The text content of the sub heading.
   */
  public async subHeading(): Promise<string> {
    const subHeading = await this.driver.select('.ZCard-header-subheading');
    return subHeading.text();
  }

  /**
   * Gets the content area.
   *
   * @returns
   *        The driver to query the content area of the card.
   */
  public content(): Promise<IZCircusDriver> {
    return this.driver.select('.ZCard-content');
  }

  /**
   * Gets the footer area.
   *
   * @returns
   *        The driver to query the footer area of the card.
   *        Returns null if there is no footer.
   */
  public async footer(): Promise<IZCircusDriver | null> {
    const [footer] = await this.driver.query('.ZCard-footer');
    return footer || null;
  }
}
