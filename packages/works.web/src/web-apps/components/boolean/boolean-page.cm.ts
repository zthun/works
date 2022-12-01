import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZBooleanComponentModel, ZButtonComponentModel } from '@zthun/works.react';

/**
 * Represents a component model for the boolean page.
 */
export class ZBooleanPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBooleanPage-root';

  /**
   * Gets the main checkbox demo component.
   *
   * @returns
   *      The main checkbox demo component.
   */
  public checkbox(): Promise<ZBooleanComponentModel> {
    const name = 'checkbox';
    return ZCircusComponentModel.create(this.driver, ZBooleanComponentModel, ZBooleanComponentModel.selector(name));
  }

  /**
   * Gets the main switch demo component.
   *
   * @returns
   *      The main switch demo component.
   */
  public switch(): Promise<ZBooleanComponentModel> {
    const name = 'switch';
    return ZCircusComponentModel.create(this.driver, ZBooleanComponentModel, ZBooleanComponentModel.selector(name));
  }

  /**
   * Gets the option for disabling the boolean demo components.
   *
   * @returns
   *        The option switch to disable the boolean demos.
   */
  public disabled(): Promise<ZBooleanComponentModel> {
    const name = 'disabled';
    return ZCircusComponentModel.create(this.driver, ZBooleanComponentModel, ZBooleanComponentModel.selector(name));
  }

  /**
   * Gets the button that toggles the switch and checkbox states off.
   *
   * @returns
   *        The button to toggle off all demo booleans.
   */
  public off(): Promise<ZButtonComponentModel> {
    const name = 'off';
    return ZCircusComponentModel.create(this.driver, ZButtonComponentModel, ZButtonComponentModel.selector(name));
  }

  /**
   * Gets the button that toggles the switch and checkbox states on.
   *
   * @returns
   *        The button to toggle on all demo booleans.
   */
  public on(): Promise<ZButtonComponentModel> {
    const name = 'on';
    return ZCircusComponentModel.create(this.driver, ZButtonComponentModel, ZButtonComponentModel.selector(name));
  }

  /**
   * Gets the button that toggles the switch and checkbox states to an indeterminate
   * state if supported.
   *
   * @returns
   *        The button to toggle all booleans to the indeterminate state.
   */
  public indeterminate(): Promise<ZButtonComponentModel> {
    const name = 'indeterminate';
    return ZCircusComponentModel.create(this.driver, ZButtonComponentModel, ZButtonComponentModel.selector(name));
  }

  /**
   * Gets the current value state behind the scenes.
   *
   * @returns
   *        The current value state.
   */
  public async value(): Promise<boolean> {
    const label = await this.driver.select('.ZBooleanPage-value');
    const text = await label.text();
    return text === 'true';
  }
}
