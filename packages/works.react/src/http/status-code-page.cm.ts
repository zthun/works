import { ZCircusComponentModel } from '@zthun/cirque';
import { ZHttpCode, ZHttpCodeCategory } from '@zthun/webigail-http';

/**
 * Represents a component model for the ZStatusCode page.
 */
export class ZStatusCodePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZStatusCodePage-root';

  /**
   * Gets the http code that is being displayed.
   *
   * @returns
   *        The http code being displayed as a string.
   */
  public async code(): Promise<ZHttpCode> {
    const block = await this.driver.select('.ZStatusCodePage-code');
    const code = await block.text();
    return +code as ZHttpCode;
  }

  /**
   * Gets the description being displayed.
   *
   * @returns
   *        The underlying http code description.
   */
  public async description(): Promise<string | null> {
    const block = await this.driver.select('.ZStatusCodePage-description');
    return block.text();
  }

  /**
   * Gets the status code page category.
   *
   * @returns
   *        The category for the code page.
   */
  public async category(): Promise<ZHttpCodeCategory> {
    const block = await this.driver.select('.ZStatusCodePage-icon');
    return (await block.attribute('data-category')) as ZHttpCodeCategory;
  }
}
