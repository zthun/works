import { IZCircusDriver, ZCircusActBuilder } from '@zthun/works.cirque';

/**
 * Represents the component model for a button element.
 */
export class ZButtonComponentModel {
  public static readonly Selector = '.ZButton-root';

  /**
   * Initializes a new instance of this object.
   *
   * @param _driver
   *        The driver to manage the component.
   */
  public constructor(private readonly _driver: IZCircusDriver) {}

  /**
   * Returns the name of the button.
   *
   * @returns
   *        The button name if it has one.  Null otherwise.
   */
  public name(): Promise<string | null> {
    return this._driver.attribute('data-name');
  }

  /**
   * Gets whether the button is in the loading state.
   *
   * @returns
   *        True if the button is in the loading state.  False otherwise.
   */
  public loading(): Promise<boolean> {
    return this._driver.peek('.ZCircularProgress-root');
  }

  /**
   * Gets whether the button is disabled.
   *
   * @returns
   *        True if the button is disabled.  False otherwise.
   */
  public disabled(): Promise<boolean> {
    return this._driver.disabled();
  }

  /**
   * Gets whether the button is outlined.
   *
   * @returns
   *        True if the button is outlined.  False otherwise.
   */
  public async outlined(): Promise<boolean> {
    const c = await this._driver.classes(['ZButton-outline']);
    return !!c.length;
  }

  /**
   * Gets whether the button is borderless.
   *
   * @returns
   *        True if the button is borderless.  False otherwise.
   */
  public async borderless(): Promise<boolean> {
    const c = await this._driver.classes(['ZButton-borderless']);
    return !!c.length;
  }

  /**
   * Gets the button content text, if any.
   *
   * @returns
   *        The button content text, if any.
   */
  public async text(): Promise<string | null> {
    const content = await this._driver.select('.ZButton-content');
    return content.text();
  }

  /**
   * Clicks the button.
   *
   * @returns A promise that resolves when the button is clicked.
   */
  public click(): Promise<void> {
    const act = new ZCircusActBuilder().click().build();
    return this._driver.perform(act);
  }

  /**
   * Waits for the loading indicator to go away.
   *
   * @returns
   *        A promise that resolves once the button is ready.
   */
  public load(): Promise<void> {
    return this._driver.wait(() => this.loading().then((l) => !l));
  }
}
