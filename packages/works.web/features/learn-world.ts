import { setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { IZCircusDriver, ZCircusComponentModel, ZCircusComponentModelConstructor } from '@zthun/works.cirque';
import { ZCircusSetupChrome } from '@zthun/works.cirque-du-selenium';
import { ZUrlBuilder } from '@zthun/works.url';

/**
 * Represents a modifiable set of parameters.
 */
export interface IZLearnPage<T extends ZCircusComponentModel | never> {
  /**
   * The page component model.
   */
  page: T;
}

/**
 * The current world
 */
export class ZLearnWorld<T extends ZCircusComponentModel | never = never> extends World<IZLearnPage<T>> {
  private _driver: IZCircusDriver | null = null;

  /**
   * Closes the browser if it is open.
   */
  public async close() {
    await this._driver?.destroy();
    this._driver = null;
  }

  /**
   * Constructs a new page component model from the internal driver.
   *
   * @param model
   *        The model to construct.
   * @param selector
   *        The css selector to query for the root element.
   *
   * @returns
   *        A new component model of type T.
   */
  public async create<T>(model: ZCircusComponentModelConstructor<T>, selector: string) {
    const driver = await this.open();
    return ZCircusComponentModel.create(driver, model, selector);
  }

  /**
   * Navigates to a specific hash route.
   *
   * @param route
   *        The route to navigate to.
   *
   * @returns
   *        A driver that points to the body element.
   */
  public async navigate(route: string): Promise<IZCircusDriver> {
    const driver = await this.open();
    const current = await driver.url();
    const next = new ZUrlBuilder().parse(current).hash(route).build();
    this._driver = await driver.url(next);
    return this._driver;
  }

  /**
   * Opens the application.
   *
   * @returns
   *        The driver that points to the root element.
   */
  public async open() {
    if (this._driver != null) {
      return this._driver;
    }

    const url = 'https://local.zthunworks.com';
    this._driver = await new ZCircusSetupChrome(url).setup();
    return this._driver;
  }
}

setDefaultTimeout(30000);
setWorldConstructor(ZLearnWorld);
