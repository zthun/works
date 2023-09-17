import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZButtonComponentModel } from '@zthun/fashion-boutique';

/**
 * Represents the component model for the home page.
 */
export class ZHomePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZHomePage-root';

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
