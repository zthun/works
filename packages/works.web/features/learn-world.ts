import { setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { IZCircusDriver, ZCircusBy, ZCircusComponentConstructor, ZCircusComponentModel } from '@zthun/works.cirque';
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
   *
   * @returns
   *        A new component model of type T.
   */
  public async create<T extends ZCircusComponentModel>(model: ZCircusComponentConstructor<T>): Promise<T> {
    const driver = await this.open();
    return ZCircusBy.first(driver, model);
  }

  /**
   * Opens the application and navigates to the given route.
   *
   * @param route
   *        The route to open.
   * @returns
   *        The driver that points to the root element.
   */
  public async open(route?: string) {
    if (this._driver != null) {
      return this._driver;
    }

    const url = new ZUrlBuilder().parse('https://local.zthunworks.com').hash(route).build();
    this._driver = await new ZCircusSetupChrome(url).setup();
    return this._driver;
  }
}

setDefaultTimeout(30000);
setWorldConstructor(ZLearnWorld);
