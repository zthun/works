import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZButtonComponentModel } from '@zthun/fashion-boutique';

/**
 * Represents the component model for the home page.
 */
export class ZHomePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZHomePage-root';

  /**
   * Gets the button to open web apps.
   *
   * @returns
   *        The button component model to open web apps.
   */
  public async webApps(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'web-apps-get-started');
  }

  /**
   * Gets the button to open microservices.
   *
   * @returns
   *        The button component to open microservices.
   */
  public async microservices(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'microservices-get-started');
  }
}
