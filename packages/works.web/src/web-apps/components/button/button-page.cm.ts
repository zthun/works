import { ZCircusComponentModel } from '@zthun/works.cirque';
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
    return ZCircusComponentModel.create(this.driver, ZButtonComponentModel, ZButtonComponentModel.selector('button'));
  }

  /**
   * Gets the icon button demo.
   *
   * @returns
   *        The icon button component.
   */
  public async iconButton(): Promise<ZButtonComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZButtonComponentModel,
      ZButtonComponentModel.selector('icon-button')
    );
  }

  /**
   * Gets the loading option switch.
   *
   * @returns
   *        The loading option switch.
   */
  public async loading(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('loading')
    );
  }

  /**
   * Gets the disabled option switch.
   *
   * @returns
   *        The disabled option switch.
   */
  public async disabled(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('disabled')
    );
  }

  /**
   * Gets the outline option switch.
   *
   * @returns
   *        The outline option switch.
   */
  public async outline(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('outline')
    );
  }

  /**
   * Gets the borderless option switch.
   *
   * @returns
   *        The borderless option switch.
   */
  public async borderless(): Promise<ZBooleanComponentModel> {
    return ZCircusComponentModel.create(
      this.driver,
      ZBooleanComponentModel,
      ZBooleanComponentModel.selector('borderless')
    );
  }

  /**
   * Gets the fashion drop down.
   *
   * @returns
   *        The fashion drop down.
   */
  public async fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusComponentModel.create(this.driver, ZChoiceComponentModel, ZChoiceComponentModel.selector('fashion'));
  }

  /**
   * Gets the current alert list.
   *
   * @returns
   *        The current alert list.
   */
  public async alerts(): Promise<ZAlertListComponentModel> {
    const body = await this.driver.body();
    return ZCircusComponentModel.create(body, ZAlertListComponentModel, ZAlertListComponentModel.Selector);
  }
}
