import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel } from '@zthun/works.cirque';
import { firstDefined } from '@zthun/works.core';

/**
 * Represents the component model for a ZText component.
 */
export class ZTextComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZText-root';

  /**
   * Gets the underlying input.
   *
   * @returns
   *      The underlying input driver context.
   */
  private _input(): Promise<IZCircusDriver> {
    return this.driver.select('input');
  }

  /**
   * Gets the revealer for this component.
   *
   * @returns
   *        The revealer for the text component.
   *        Returns null if the component does not support
   *        toggling text masking.
   */
  private async _revealer(): Promise<IZCircusDriver | null> {
    const [revealer] = await this.driver.query('.ZText-revealer');
    return firstDefined(null, revealer);
  }

  /**
   * Gets the value of the component model.
   *
   * @returns
   *        The string value of the component.
   */
  public async value(): Promise<string | null> {
    return (await this._input()).value();
  }

  /**
   * Gets whether the component is disabled.
   *
   * @returns
   *        True if the component is disabled.
   *        False otherwise.
   */
  public async disabled(): Promise<boolean> {
    return (await this._input()).disabled();
  }

  /**
   * Gets whether the text is marked as required.
   *
   * @returns
   *        True if the component has the required
   *        flag.  False otherwise.
   */
  public async required(): Promise<boolean> {
    const required = await this.driver.attribute('data-required');
    const value = firstDefined('false', required);
    return value === 'true';
  }

  /**
   * Gets whether the text is masked or revealed.
   *
   * @returns
   *        True if the text is revealed.  False if
   *        masked.
   */
  public async masked(): Promise<boolean> {
    const input = await this._input();
    return (await input.attribute('type')) === 'password';
  }

  /**
   * Types a text string into the input.
   *
   * @param text
   *        The text to type.
   *
   * @returns
   *        The updated value.
   */
  public async keyboard(text: string): Promise<string | null> {
    const act = new ZCircusActBuilder().click().type(text).build();
    const input = await this._input();
    await input.perform(act);
    return this.value();
  }

  /**
   * Attempts to toggle the text mask state.
   *
   * If the component does not support a text mask
   * state, then this method does nothing.
   *
   * @returns
   *        True if the toggle was attempted, false if this
   *        component does not support the toggle operation.
   */
  public async toggle(): Promise<boolean> {
    const revealer = await this._revealer();

    if (revealer) {
      await revealer.perform(new ZCircusActBuilder().click().build());
      return true;
    }

    return false;
  }

  /**
   * Attempts to reveal or mask the text.
   *
   * @param mask
   *        True to mask the text, false to reveal it.
   *
   * @returns
   *        True if the text is masked, false otherwise.
   */
  private async _mask(mask: boolean): Promise<boolean> {
    const masked = await this.masked();

    if (masked !== mask) {
      await this.toggle();
    }

    return this.masked();
  }

  /**
   * Attempts to reveal masked text.
   *
   * If the text is not masked, then this method does
   * nothing.
   *
   * @returns
   *        True if the text is revealed, false if masked.
   */
  public async reveal(): Promise<boolean> {
    return this._mask(false).then((m) => !m);
  }

  /**
   * Attempts to mask the text.
   *
   * If this text is already masked, then this method does
   * nothing.
   *
   * @returns
   *        True if the text is masked, false if revealed.
   *
   */
  public async mask(): Promise<boolean> {
    return this._mask(true);
  }
}
