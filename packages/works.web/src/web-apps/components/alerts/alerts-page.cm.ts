import { ZCircusComponentModel } from '@zthun/works.cirque';
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
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('option-immortal')
    );
  }

  /**
   * Gets the boolean option for the header switch.
   *
   * @returns
   *        The header boolean switch.
   */
  public header() {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('option-header')
    );
  }

  /**
   * Gets the success button.
   *
   * @returns
   *        The success button.
   */
  public success() {
    return ZCircusComponentModel.create(
      this.driver,
      ZButtonComponentModel,
      ZButtonComponentModel.selector('alert-success')
    );
  }

  /**
   * Gets the warning button.
   *
   * @returns
   *        The warning button.
   */
  public warning() {
    return ZCircusComponentModel.create(
      this.driver,
      ZButtonComponentModel,
      ZButtonComponentModel.selector('alert-warning')
    );
  }

  /**
   * Gets the error button.
   *
   * @returns
   *        The error button.
   */
  public error() {
    return ZCircusComponentModel.create(
      this.driver,
      ZButtonComponentModel,
      ZButtonComponentModel.selector('alert-error')
    );
  }

  /**
   * Gets the info button.
   *
   * @returns
   *        The info button.
   */
  public info() {
    return ZCircusComponentModel.create(
      this.driver,
      ZButtonComponentModel,
      ZButtonComponentModel.selector('alert-info')
    );
  }

  /**
   * Gets the current alert list.
   *
   *  @returns
   *        The current alert list.
   */
  public async alerts() {
    return ZCircusComponentModel.create(
      await this.driver.body(),
      ZAlertListComponentModel,
      ZAlertListComponentModel.Selector
    );
  }
}
