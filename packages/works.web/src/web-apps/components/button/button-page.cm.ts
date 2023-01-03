import { ZCircusBy, ZCircusComponentModel } from '@zthun/works.cirque';
import {
  ZAlertListComponentModel,
  ZBooleanComponentModel,
  ZButtonComponentModel,
  ZChoiceComponentModel
} from '@zthun/works.react';

/**
 * Represents the component model for the button demo page.
 */
export class ZButtonPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZButtonPage-root';

  /**
   * Gets the main button demo.
   *
   * @returns
   *        The main button component.
   */
  public async button(): Promise<ZButtonComponentModel> {
    return ZCircusBy.named(this.driver, ZButtonComponentModel, 'button');
  }

  /**
   * Gets the icon button demo.
   *
   * @returns
   *        The icon button component.
   */
  public async iconButton(): Promise<ZButtonComponentModel> {
    return ZCircusBy.named(this.driver, ZButtonComponentModel, 'icon-button');
  }

  /**
   * Gets the loading option switch.
   *
   * @returns
   *        The loading option switch.
   */
  public async loading(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.named(this.driver, ZBooleanComponentModel, 'loading');
  }

  /**
   * Gets the disabled option switch.
   *
   * @returns
   *        The disabled option switch.
   */
  public async disabled(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.named(this.driver, ZBooleanComponentModel, 'disabled');
  }

  /**
   * Gets the outline option switch.
   *
   * @returns
   *        The outline option switch.
   */
  public async outline(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.named(this.driver, ZBooleanComponentModel, 'outline');
  }

  /**
   * Gets the borderless option switch.
   *
   * @returns
   *        The borderless option switch.
   */
  public async borderless(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.named(this.driver, ZBooleanComponentModel, 'borderless');
  }

  /**
   * Gets the fashion drop down.
   *
   * @returns
   *        The fashion drop down.
   */
  public async fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.named(this.driver, ZChoiceComponentModel, 'fashion');
  }

  /**
   * Gets the current alert list.
   *
   * @returns
   *        The current alert list.
   */
  public async alerts(): Promise<ZAlertListComponentModel> {
    return ZCircusBy.first(await this.driver.body(), ZAlertListComponentModel);
  }
}
