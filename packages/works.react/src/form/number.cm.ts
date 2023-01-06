import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/cirque';
import { firstDefined } from '@zthun/works.core';

/**
 * Represents the component model for a number component.
 */
export class ZNumberComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZNumber-root';

  /**
   * Gets the underlying input.
   *
   * @returns
   *        The underlying input that contains the
   *        actual numeric form value.
   */
  private _input(): Promise<IZCircusDriver> {
    return this.driver.select('input');
  }

  /**
   * Gets the current step count.
   *
   * @returns
   *        The step value.
   */
  public async step(): Promise<number> {
    const input = await this._input();
    return +firstDefined('1', await input.attribute('step'));
  }

  /**
   * Gets the current minimum value.
   *
   * @returns
   *        The minimum value.
   */
  public async min(): Promise<number> {
    const input = await this._input();
    return +firstDefined('0', await input.attribute('min'));
  }

  /**
   * Gets the current maximum value.
   *
   * @returns
   *        The maximum value.
   */
  public async max(): Promise<number> {
    const input = await this._input();
    return +firstDefined('100', await input.attribute('max'));
  }

  /**
   * Gets the value of the number component.
   *
   * @returns
   *        The value of the number component.
   *        This can be null if the number component
   *        can be cleared.
   */
  public async value(): Promise<number | null> {
    const input = await this._input();
    const value = await input.value();
    return value ? +value : null;
  }

  /**
   * Gets the label for the number component.
   *
   * @returns
   *        The label for the number component.  Returns
   *        the empty string if there is no label.
   */
  public async label(): Promise<string> {
    const [label] = await this.driver.query('label');
    const text = await label?.text();
    return firstDefined('', text);
  }

  /**
   * Spins the spinner if available.
   *
   * @param direction
   *        The direction to spin.
   * @param times
   *        The number of times to spin.  Only the first
   *        time is the spinner clicked.  The remaining
   *        time, the spinner is activated using the
   *        Enter key.
   *
   * @returns
   *        The input value.
   */
  private async _spinClick(direction: 1 | -1, times: number): Promise<number | null> {
    const query = direction > 0 ? '.ZNumber-spinner-increment' : '.ZNumber-spinner-decrement';
    const [spinner] = await this.driver.query(query);

    if (times > 0) {
      await spinner.perform(new ZCircusActBuilder().click().build());
    }

    for (let i = 1; i < times; ++i) {
      await spinner.perform(new ZCircusActBuilder().press(ZCircusKeyboardQwerty.enter).build());
    }

    return this.value();
  }

  /**
   * Spins the spinner by using the keyboard.
   *
   * @param direction
   *        The direction to spin.
   * @param times
   *        The number of times to spin.
   *
   * @returns
   *        The input value.
   */
  private async _spinPress(direction: 1 | -1, times: number): Promise<number | null> {
    const input = await this._input();

    const dir = direction > 0 ? ZCircusKeyboardQwerty.upArrow : ZCircusKeyboardQwerty.downArrow;

    for (let i = 0; i < times; ++i) {
      await input.perform(new ZCircusActBuilder().click().press(dir).build());
    }

    return this.value();
  }

  /**
   * Increments the number component.
   *
   * Note that invoking this requires the component to have a visible
   * spinner.  If there is none, then this method will just set the value.
   *
   * @param times
   *        The number of times to increment.
   *
   * @returns
   *        The value of the input.
   */
  public increment(times = 1): Promise<number | null> {
    return this._spinClick(1, times);
  }

  /**
   * Same as increment, but uses the keyboard instead.
   *
   * @param times
   *        The number of times to increment.
   *
   * @returns
   *        The value of the input.
   *
   */
  public up(times = 1): Promise<number | null> {
    return this._spinPress(1, times);
  }

  /**
   * Decrements the number component.
   *
   * Note that invoking this requires the component to have a visible
   * spinner.  If there is none, then this method does nothing.
   *
   * @param times
   *        The number of times to decrement.
   *
   * @returns
   *        The value of the input.
   */
  public decrement(times = 1): Promise<number | null> {
    return this._spinClick(-1, times);
  }

  /**
   * Same as decrement, but uses the keyboard instead.
   *
   * @param times
   *        The number of times to decrement.
   *
   * @returns
   *        The value of the input.
   */
  public down(times = 1): Promise<number | null> {
    return this._spinPress(-1, times);
  }

  /**
   * Attempts to set the value directly by typing into the input, if possible.
   *
   * @param value
   *        The value to type.
   *
   * @returns
   *        The value of the input.
   */
  public async keyboard(value: string): Promise<number | null> {
    const input = await this._input();
    await input.perform(new ZCircusActBuilder().click().type(value).press(ZCircusKeyboardQwerty.tab).build());
    return this.value();
  }

  /**
   * Clears the input value.
   */
  public async clear(): Promise<void> {
    const input = await this._input();
    const value = firstDefined('', await input.value());
    const deletes = value.length;

    let act = new ZCircusActBuilder().click();

    for (let i = 0; i < deletes; ++i) {
      act = act.press(ZCircusKeyboardQwerty.backspace);
    }
    for (let i = 0; i < deletes; ++i) {
      act = act.press(ZCircusKeyboardQwerty.delete);
    }

    act = act.press(ZCircusKeyboardQwerty.tab);

    await input.perform(act.build());
  }
}
