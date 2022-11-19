import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZBooleanComponentModel, ZButtonComponentModel } from '@zthun/works.react';

/**
 * Represents a component model for the alerts page.
 */
export class ZAlertsPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZAlertsPage-root';

  /**
   * Gets a boolean option switch.
   *
   * @param name
   *        The name of the switch
   *
   * @returns
   *        The boolean component model with the given name.
   */
  private _option(name: string): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(this.driver, ZBooleanComponentModel, ZBooleanComponentModel.selector(name));
  }

  /**
   * Gets the boolean option for the immortal switch.
   *
   * @returns
   *        The immortal boolean switch.
   */
  public immortal: () => Promise<ZBooleanComponentModel> = this._option.bind(this, 'option-immortal');

  /**
   * Gets the boolean option for the header switch.
   *
   * @returns
   *        The header boolean switch.
   */
  public header: () => Promise<ZBooleanComponentModel> = this._option.bind(this, 'option-header');

  /**
   * Returns one of the specific button components.
   *
   * @param name
   *        The name of the button to query.
   *
   * @returns
   *        The button with the given name.
   */
  private _button(name: string): Promise<ZButtonComponentModel> {
    return ZCircusComponentModel.create(this.driver, ZButtonComponentModel, ZButtonComponentModel.selector(name));
  }

  /**
   * Gets the success button.
   *
   * @returns
   *        The success button.
   */
  public success: () => Promise<ZButtonComponentModel> = this._button.bind(this, 'alert-success');

  /**
   * Gets the warning button.
   *
   * @returns
   *        The warning button.
   */
  public warning: () => Promise<ZButtonComponentModel> = this._button.bind(this, 'alert-warning');

  /**
   * Gets the error button.
   *
   * @returns
   *        The error button.
   */
  public error: () => Promise<ZButtonComponentModel> = this._button.bind(this, 'alert-error');

  /**
   * Gets the info button.
   *
   * @returns
   *        The info button.
   */
  public info: () => Promise<ZButtonComponentModel> = this._button.bind(this, 'alert-info');
}
