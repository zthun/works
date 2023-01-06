import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZAlertListComponentModel, ZBooleanComponentModel, ZButtonComponentModel } from '@zthun/works.react';

/**
 * Represents a component model for the alerts page.
 */
export class ZAlertsPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZAlertsPage-root';

  /**
   * Gets the boolean option for the immortal switch.
   *
   * @returns
   *        The immortal boolean switch.
   */
  public immortal() {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'option-immortal');
  }

  /**
   * Gets the boolean option for the header switch.
   *
   * @returns
   *        The header boolean switch.
   */
  public header() {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'option-header');
  }

  /**
   * Gets the success button.
   *
   * @returns
   *        The success button.
   */
  public success() {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'alert-success');
  }

  /**
   * Gets the warning button.
   *
   * @returns
   *        The warning button.
   */
  public warning() {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'alert-warning');
  }

  /**
   * Gets the error button.
   *
   * @returns
   *        The error button.
   */
  public error() {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'alert-error');
  }

  /**
   * Gets the info button.
   *
   * @returns
   *        The info button.
   */
  public info() {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'alert-info');
  }

  /**
   * Gets the current alert list.
   *
   *  @returns
   *        The current alert list.
   */
  public async alerts() {
    return ZCircusBy.first(await this.driver.body(), ZAlertListComponentModel);
  }
}
