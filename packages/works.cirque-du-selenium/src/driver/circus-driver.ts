/* eslint-disable valid-jsdoc */
import { IZCircusAct, IZCircusDriver } from '@zthun/works.cirque';
import { By, WebDriver, WebElement } from 'selenium-webdriver';

/**
 * Represents the circus driver for selenium actions.
 */
export class ZCircusDriver implements IZCircusDriver {
  /**
   * Initializes a new instance of this object.
   *
   * @param _seleniumDriver
   *        The underlying web driver.
   */
  public constructor(private _seleniumDriver: WebDriver, private _search: WebElement) {}

  /**
   * @inheritdoc
   */
  public async destroy(): Promise<void> {
    await this._seleniumDriver.close();
    await this._seleniumDriver.quit();
  }

  /**
   * @inheritdoc
   */
  public async attribute(attribute: string): Promise<string> {
    return this._search.getAttribute(attribute);
  }

  /**
   * @inheritdoc
   */
  public text(): Promise<string> {
    return this._search.getText();
  }

  /**
   * @inheritdoc
   */
  public async peek(selector: string): Promise<boolean> {
    const results = await this._search.findElements(By.css(selector));
    return !!results.length;
  }

  /**
   * @inheritdoc
   */
  public async select(selector: string): Promise<IZCircusDriver> {
    const found = await this._search.findElement(By.css(selector));
    return new ZCircusDriver(this._seleniumDriver, found);
  }

  /**
   * @inheritdoc
   */
  public async query(selector: string): Promise<IZCircusDriver[]> {
    const found = await this._search.findElements(By.css(selector));
    return found.map((e) => new ZCircusDriver(this._seleniumDriver, e));
  }

  /**
   * @inheritdoc
   */
  public perform(act: IZCircusAct): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * @inheritdoc
   */
  public wait(predicate: () => boolean | Promise<boolean>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
