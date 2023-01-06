import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';

/**
 * Represents a react component model for the ZBoolean component.
 */
export class ZBooleanComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBoolean-root';

  /**
   * Gets the underlying input element.
   *
   * @returns
   *        The underlying input element.
   */
  private async _input(): Promise<IZCircusDriver> {
    return this.driver.select('input[type="checkbox"]');
  }

  /**
   * Gets whether this boolean is disabled.
   *
   * @returns
   *      True if the component is disabled,
   *      false otherwise.
   */
  public async disabled(): Promise<boolean> {
    return (await this._input()).disabled();
  }

  /**
   * Gets the value of the input check state for the checkbox.
   *
   * @returns
   *        The check state value or null if indeterminate.
   */
  public async value(): Promise<boolean | null> {
    const input = await this._input();
    const indeterminate = await input.attribute('data-indeterminate');
    return indeterminate === 'true' ? null : input.selected();
  }

  /**
   * Toggles the checkbox.
   *
   * @param value
   *        The value to toggle to.  If this is
   *        undefined, then the input is simply
   *        clicked and that ends the operation.
   *
   * @returns
   *        A promise that resolves once the toggle
   *        has reached the given state.
   */
  public async toggle(value?: boolean): Promise<void> {
    const current = await this.value();

    if (current === value) {
      // Already in the state we need to be in.
      return;
    }

    const input = await this._input();
    const act = new ZCircusActBuilder().click().build();
    await input.perform(act);
  }
}
