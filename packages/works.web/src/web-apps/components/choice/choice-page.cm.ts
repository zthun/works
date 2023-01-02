import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZBooleanComponentModel, ZChoiceComponentModel } from '@zthun/works.react';

/**
 * Represents the component model for the choice page demo.
 */
export class ZChoicePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZChoicePage-root';

  /**
   * Gets the current value list.
   *
   * @returns
   *        The current value list.
   */
  public async value(): Promise<string[]> {
    const list = await this.driver.query('.ZChoicePage-value');
    const values = await Promise.all(list.map((l) => l.text()));
    return values;
  }

  /**
   * Gets the drop down choice component.
   *
   * @returns
   *        The drop down choice component.
   */
  public dropdown(): Promise<ZChoiceComponentModel> {
    return ZCircusComponentModel.create(this.driver, ZChoiceComponentModel, ZChoiceComponentModel.selector('dropdown'));
  }

  /**
   * Gets the auto complete choice component.
   *
   * @returns
   *        The auto complete choice component.
   */
  public autocomplete(): Promise<ZChoiceComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZChoiceComponentModel,
      ZChoiceComponentModel.selector('autocomplete')
    );
  }

  /**
   * Gets the option to disable the drop downs.
   *
   * @returns
   *      The boolean option to disable the drop downs.
   */
  public disabled(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('disabled')
    );
  }

  /**
   * Gets the option to select multiple options from the drop downs.
   *
   * @returns
   *      The boolean option to select multiple options the drop downs.
   */
  public multiple(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('multiple')
    );
  }

  /**
   * Gets the option to remove clear support from the drop downs.
   *
   * @returns
   *      The boolean option to remove clear support the drop downs.
   */
  public indelible(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('indelible')
    );
  }
}
