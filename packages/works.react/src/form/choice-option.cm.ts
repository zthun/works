import { IZCircusDriver } from '@zthun/works.cirque';
import { firstDefined } from '@zthun/works.core';

/**
 * Represents a choice option or value in the Choice component model.
 */
export class ZChoiceOptionComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param driver
   *        The driver to manage the component.
   */
  public constructor(public readonly driver: IZCircusDriver) {}

  /**
   * Gets the value for the option.
   *
   * @returns
   *      The value for the option.
   */
  public value(): Promise<string | null> {
    return this.driver.attribute('data-value');
  }

  /**
   * Gets the raw text string of the value.
   *
   * @returns
   *        The text of the option.
   */
  public async text(): Promise<string> {
    const text = await this.driver.text();
    return firstDefined('', text);
  }
}
