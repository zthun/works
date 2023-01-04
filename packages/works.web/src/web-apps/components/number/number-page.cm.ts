import { ZCircusBy, ZCircusComponentModel } from '@zthun/works.cirque';
import { ZNumberComponentModel } from '@zthun/works.react';
import { trim } from 'lodash';

/**
 * Represents the component model for the number page.
 */
export class ZNumberPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZNumberPage-root';

  /**
   * Gets the current page detected value.
   *
   * @returns
   *        The current page value.
   */
  public async value(): Promise<number | null> {
    const element = await this.driver.select('.ZNumberPage-value');
    const text = await element.text();
    const trimmed = trim(text.replace('Value:', ''));
    return trimmed ? +trimmed : null;
  }

  /**
   * Gets the spinner component.
   *
   * @returns
   *        The spinner component.
   */
  public spinner(): Promise<ZNumberComponentModel> {
    return ZCircusBy.named(this.driver, ZNumberComponentModel, 'spinner');
  }
}
