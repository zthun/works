import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZBooleanComponentModel, ZTextComponentModel } from '@zthun/works.react';
import { trimEnd, trimStart } from 'lodash';

/**
 * The component model for the text demo page.
 */
export class ZTextPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTextPage-root';

  /**
   * Gets the current text value.
   *
   * @returns
   *        The current test value.
   */
  public async value(): Promise<string> {
    const value = await this.driver.select('.ZTextPage-value');
    const text = await value.text();
    const raw = text.replace('Value: ', '');
    return trimEnd(trimStart(raw, '"'), '"');
  }

  /**
   * Gets the basic text input.
   *
   * @returns
   *        The basic text input.
   */
  public text(): Promise<ZTextComponentModel> {
    return ZCircusBy.first(this.driver, ZTextComponentModel, 'text');
  }

  /**
   * Gets the password text input.
   *
   * @returns
   *        The password text input.
   */
  public password(): Promise<ZTextComponentModel> {
    return ZCircusBy.first(this.driver, ZTextComponentModel, 'password');
  }

  /**
   * Gets the reveal text input.
   *
   * @returns
   *        The reveal text input.
   */
  public reveal(): Promise<ZTextComponentModel> {
    return ZCircusBy.first(this.driver, ZTextComponentModel, 'reveal');
  }

  /**
   * Gets the text area input.
   *
   * @returns
   *        The text area input.
   */
  public area(): Promise<ZTextComponentModel> {
    return ZCircusBy.first(this.driver, ZTextComponentModel, 'area');
  }

  /**
   * Gets the disabled option switch.
   *
   * @returns
   *        The disabled option switch.
   */
  public disabled(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'disabled');
  }

  /**
   * Gets the read only option switch.
   *
   * @returns
   *        The read only option switch.
   */
  public readOnly(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'read-only');
  }

  /**
   * Gets the required option switch.
   *
   * @returns
   *        The required option switch.
   */
  public required(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'required');
  }

  /**
   * Gets the adornments option switch.
   *
   * @returns
   *        The adornments option switch.
   */
  public adornments(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'adornments');
  }
}
