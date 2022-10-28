/* eslint-disable valid-jsdoc */
import { IZCircusAct, IZCircusAction, IZCircusDriver, ZCircusActionType } from '@zthun/works.cirque';
import { keyBy } from 'lodash';
import { Actions, Button, By, WebDriver, WebElement } from 'selenium-webdriver';

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
  public async attribute(attribute: string): Promise<string> {
    return this._search.getAttribute(attribute);
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
    return this.attribute('value');
  }

  /**
   * @inheritdoc
   */
  public async input(): Promise<string | null> {
    return null;
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
    const body = this._seleniumDriver.findElement(By.name('body'));
    return Promise.resolve(new ZCircusDriver(this._seleniumDriver, body));
  }

  /**
   * @inheritdoc
   */
  public async perform(act: IZCircusAct): Promise<void> {
    let performance = this._seleniumDriver.actions();

    const map: Record<ZCircusActionType, (a: IZCircusAction) => Actions> = {
      [ZCircusActionType.MouseLeftDown]: () => performance.press(Button.LEFT),
      [ZCircusActionType.MouseLeftUp]: () => performance.release(Button.LEFT),
      [ZCircusActionType.MouseRightDown]: () => performance.press(Button.RIGHT),
      [ZCircusActionType.MouseRightUp]: () => performance.release(Button.RIGHT),
      [ZCircusActionType.KeyDown]: (a: IZCircusAction) => performance.keyDown(a.context.code),
      [ZCircusActionType.KeyUp]: (a: IZCircusAction) => performance.keyUp(a.context.code),
      [ZCircusActionType.Magic]: (a: IZCircusAction) => {
        a.context();
        return performance;
      }
    };

    act.actions.forEach((action) => {
      performance = map[action.name](action);
    });

    await performance.perform();
  }

  /**
   * @inheritdoc
   */
  public async wait(predicate: () => boolean | Promise<boolean>): Promise<void> {
    await this._seleniumDriver.wait(predicate, 10000);
  }
}
