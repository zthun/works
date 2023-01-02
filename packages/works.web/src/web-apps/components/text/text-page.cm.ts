import { ZCircusComponentModel } from '@zthun/works.cirque';
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
    return ZCircusComponentModel.create(this.driver, ZTextComponentModel, ZTextComponentModel.selector('text'));
  }

  /**
   * Gets the password text input.
   *
   * @returns
   *        The password text input.
   */
  public password(): Promise<ZTextComponentModel> {
    return ZCircusComponentModel.create(this.driver, ZTextComponentModel, ZTextComponentModel.selector('password'));
  }

  /**
   * Gets the reveal text input.
   *
   * @returns
   *        The reveal text input.
   */
  public reveal(): Promise<ZTextComponentModel> {
    return ZCircusComponentModel.create(this.driver, ZTextComponentModel, ZTextComponentModel.selector('reveal'));
  }

  /**
   * Gets the text area input.
   *
   * @returns
   *        The text area input.
   */
  public area(): Promise<ZTextComponentModel> {
    return ZCircusComponentModel.create(this.driver, ZTextComponentModel, ZTextComponentModel.selector('area'));
  }

  /**
   * Gets the disabled option switch.
   *
   * @returns
   *        The disabled option switch.
   */
  public disabled(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('disabled')
    );
  }

  /**
   * Gets the read only option switch.
   *
   * @returns
   *        The read only option switch.
   */
  public readOnly(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('read-only')
    );
  }

  /**
   * Gets the required option switch.
   *
   * @returns
   *        The required option switch.
   */
  public required(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('required')
    );
  }

  /**
   * Gets the adornments option switch.
   *
   * @returns
   *        The adornments option switch.
   */
  public adornments(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('adornments')
    );
  }
}