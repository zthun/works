import { IZCircusSetup } from '@zthun/works.cirque';
import { Browser, Builder, WebDriver } from 'selenium-webdriver';

/**
 * A setup module for the chrome web driver.
 */
export class ZCircusSetupChrome implements IZCircusSetup<WebDriver> {
  /**
   * Initializes a new instance of this object.
   *
   * @param url
   *        The url to route to.
   */
  constructor(public readonly url: string) {
    require('chromedriver');
  }

  /**
   * Constructs a new browser window and navigates to it.
   */
  public async setup() {
    const driver = new Builder().forBrowser(Browser.CHROME).build();
    await driver.get(this.url);
    return driver;
  }
}
