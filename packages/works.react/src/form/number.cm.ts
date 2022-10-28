import { IZCircusDriver, ZCircusComponentModel } from '@zthun/works.cirque';
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
    return value == null ? null : +value;
  }

  /**
   * Gets the label for the number component.
   *
   * @returns
   *        The label for the number component.  Returns
   *        the empty string if there is no label.
   */
  public async label(): Promise<string> {
    const [label] = await this.driver.query('.ZNumber-label');
    const text = await label?.text();
    return firstDefined('', text);
  }

  /**
   * Spins the spinner if available.
   *
   * @param direction
   *        The direction to spin.
   * @param times
   *        The number of times to spin.
   */
  private async _spin(direction: 1 | -1, times: number): Promise<number | null> {
    // If we can't adjust the number by clicking on increment and decrement
    // buttons, then we will just set the value directly.  It's the only
    // option we have.

    const input = await this._input();
    const value = firstDefined(await this.min(), await this.value());
    const step = await this.step();
    const jump = value + direction * times * step;
    await input.input(String(jump));
    return this.value();
  }

  /**
   * Increments the number component.
   *
   * Note that invoking this requires the component to have a visible
   * spinner.  If there is none, then this method does nothing.
   *
   * @param times
   *        The number of times to increment.
   *
   * @returns
   *        The value of the input.
   */
  public increment(times = 1): Promise<number | null> {
    return this._spin(1, times);
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
    return this._spin(-1, times);
  }
}
