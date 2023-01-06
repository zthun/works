import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZFashionGridComponentModel } from '@zthun/works.react';

/**
 * Represents the component model for the fashion page.
 */
export class ZFashionPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZFashionPage-root';

  /**
   * Gets the currently selected value.
   *
   * @returns
   *        The currently selected value.
   */
  public async value(): Promise<string> {
    const selected = await this.driver.select('.ZFashionPage-selected');
    const text = await selected.text();
    return text.replace('Selected: ', '');
  }

  /**
   * Gets the fashion grid.
   *
   * @returns
   *        The fashion grid component.
   */
  public grid(): Promise<ZFashionGridComponentModel> {
    return ZCircusBy.first(this.driver, ZFashionGridComponentModel);
  }
}
