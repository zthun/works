/* eslint-disable valid-jsdoc */
import { IZCircusAct, IZCircusDriver } from '@zthun/works.cirque';
import { keyBy } from 'lodash';
import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { squash } from '../util/squash';

/**
 * Represents the circus driver for selenium actions.
 */
export class ZCircusDriver implements IZCircusDriver {
  /**
   * Initializes a new instance of this object.
   *
   * @param _seleniumDriver
   *        The underlying web driver.
   * @param _search
   *        The search context.
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
  public attribute<T extends string>(attribute: string): Promise<T | null>;

  /**
   * @inheritdoc
   */
  public attribute<T extends string>(attribute: string, fallback: T): Promise<T>;

  /**
   * @inheritdoc
   */
  public async attribute<T extends string>(attribute: string, fallback: T | null = null): Promise<T | null> {
    const attr = (await this._search.getAttribute(attribute)) as T;
    return attr == null ? fallback : attr;
  }

  /**
   * @inheritdoc
   */
  public async classes(filter?: string[]): Promise<string[]> {
    const clasz = await this._search.getAttribute('class');
    const all = clasz.split(' ');
    const _filter = filter == null ? all : filter;
    const lookup = keyBy(_filter);
    const filtered = all.filter((c) => Object.prototype.hasOwnProperty.call(lookup, c));
    return Promise.resolve(filtered);
  }

  /**
   * @inheritdoc
   */
  public tag(): Promise<string> {
    return this._search.getTagName();
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
  public value(): Promise<string> {
    return this.attribute('value', '');
  }

  /**
   * @inheritdoc
   */
  public selected(): Promise<boolean> {
    return this._search.isSelected();
  }

  /**
   * @inheritdoc
   */
  public async disabled(): Promise<boolean> {
    const enabled = await this._search.isEnabled();
    return !enabled;
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
  public body(): Promise<IZCircusDriver> {
    const body = this._seleniumDriver.findElement(By.css('body'));
    return Promise.resolve(new ZCircusDriver(this._seleniumDriver, body));
  }

  /**
   * @inheritdoc
   */
  public async focused(): Promise<IZCircusDriver | null> {
    const focused = await this._seleniumDriver.switchTo().activeElement();
    return Promise.resolve(new ZCircusDriver(this._seleniumDriver, focused));
  }

  /**
   * @inheritdoc
   */
  public async perform(act: IZCircusAct): Promise<void> {
    // Before we do anything, we need to make sure the element is scrolled into view if possible.
    await this._seleniumDriver.executeScript('arguments[0].scrollIntoView(true);', this._search);

    const factory = () => this._seleniumDriver.actions().move({ x: 0, y: 0, origin: this._search });
    const _act = squash(factory, act);
    let promise = Promise.resolve();

    _act.actions.forEach((a) => {
      promise = promise.then(() => a.context());
    });

    return promise;
  }

  /**
   * @inheritdoc
   */
  public async wait(predicate: () => boolean | Promise<boolean>, description?: string): Promise<void> {
    await this._seleniumDriver.wait(predicate, 10000, description);
  }
}
