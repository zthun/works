import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';
import { ZSuspenseComponentModel } from '../suspense/suspense.cm';

/**
 * Represents the component model for a button element.
 */
export class ZButtonComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZButton-root';

  /**
   * Returns the name of the button.
   *
   * @returns
   *        The button name if it has one.  Null otherwise.
   */
  public name(): Promise<string | null> {
    return this.driver.attribute('name');
  }

  /**
   * Gets whether the button is in the loading state.
   *
   * @returns
   *        True if the button is in the loading state.  False otherwise.
   */
  public loading(): Promise<boolean> {
    return ZSuspenseComponentModel.loading(this.driver);
  }

  /**
   * Gets whether the button is disabled.
   *
   * @returns
   *        True if the button is disabled.  False otherwise.
   */
  public disabled(): Promise<boolean> {
    return this.driver.disabled();
  }

  /**
   * Gets whether the button is outlined.
   *
   * @returns
   *        True if the button is outlined.  False otherwise.
   */
  public async outlined(): Promise<boolean> {
    const c = await this.driver.classes(['ZButton-outline']);
    return !!c.length;
  }

  /**
   * Gets whether the button is borderless.
   *
   * @returns
   *        True if the button is borderless.  False otherwise.
   */
  public async borderless(): Promise<boolean> {
    const c = await this.driver.classes(['ZButton-borderless']);
    return !!c.length;
  }

  /**
   * Gets the button content text, if any.
   *
   * @returns
   *        The button content text, if any.
   */
  public async text(): Promise<string> {
    const content = await this.driver.select('.ZButton-content');
    return content.text();
  }

  /**
   * Gets the name of the fashion that is assigned to the button.
   *
   * @returns
   *        The name of the fashion assigned to the button.
   *        Null if there is no fashion assigned.
   */
  public fashion(): Promise<string | null> {
    return this.driver.attribute('data-fashion');
  }

  /**
   * Gets the button color.
   *
   * @returns
   *        The button color.  Null if there is no fashion assigned.
   */
  public color(): Promise<string | null> {
    return this.driver.attribute('data-color');
  }

  /**
   * Clicks the button.
   *
   * @returns A promise that resolves when the button is clicked.
   */
  public click(): Promise<void> {
    const act = new ZCircusActBuilder().click().build();
    return this.driver.perform(act);
  }

  /**
   * Waits for the loading indicator to go away.
   *
   * @returns
   *        A promise that resolves once the button is ready.
   */
  public load(): Promise<void> {
    return this.driver.wait(() => this.loading().then((l) => !l));
  }
}
