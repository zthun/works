import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZButtonComponentModel } from '@zthun/works.react';

/**
 * Represents the component model for the home page.
 */
export class ZHomePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZHomePage-root';

  /**
   * Navigates to a child page by clicking a named button.
   *
   * @param name
   *        The name of the button to click.
   *
   * @returns
   *        A new instance of a component model for the given page.
   */
  private async _clickNamedButton(name: string) {
    const buttonTarget = `${ZButtonComponentModel.Selector}[name="${name}"]`;
    const button = await ZCircusComponentModel.create(this.driver, ZButtonComponentModel, buttonTarget);
    await button.click();
  }

  /**
   * Clicks the Get Started button under the web apps card.
   */
  public async openWebApps(): Promise<void> {
    await this._clickNamedButton('web-apps-get-started');
  }

  /**
   * Clicks the Get Started button under the microservices card.
   *
   * @returns
   *        The component model for the microservices page.
   */
  public async openMicroservices(): Promise<void> {
    await this._clickNamedButton('microservices-get-started');
  }
}
