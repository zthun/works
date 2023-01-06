import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/cirque';
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
  private async _input(): Promise<IZCircusDriver> {
    try {
      return await this.driver.select('input');
    } catch {
      return await this.driver.select('textarea');
    }
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
    const value = await this.driver.attribute('data-required');
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
   * Gets whether the text input is read only.
   *
   * @returns
   *        True if the text input is read only.
   *        False otherwise.
   */
  public async readOnly(): Promise<boolean> {
    const input = await this._input();
    return (await input.attribute('readOnly')) != null;
  }

  /**
   * Types a text string into the input.
   *
   * @param text
   *        The text to type.
   * @param commit
   *        The key to use push last to commit the changes.  Should
   *        be tab or enter.
   *
   * @returns
   *        The updated value.
   */
  public async keyboard(text: string, commit = ZCircusKeyboardQwerty.tab): Promise<string | null> {
    const act = new ZCircusActBuilder().click().type(text).press(commit).build();
    const input = await this._input();
    await input.perform(act);
    return this.value();
  }

  /**
   * Types an essay worth of input paragraphs into the text area.
   *
   * Each line is separated by two enter keys.  If the text
   * component does not support multi-line (I.E. it is not a Text Area)
   * then this will run all of the text together and commit on every
   * line break.
   *
   * This is somewhat of an easier way to line break multiple text
   * blocks without having to separate them with the \\n character.
   *
   * @param paragraphs
   *        The list of paragraphs to type.
   *
   * @returns
   *        The value of the text component.
   */
  public async essay(paragraphs: string[]): Promise<string | null> {
    let builder = new ZCircusActBuilder().click();

    paragraphs.forEach((paragraph) => {
      builder = builder.type(paragraph).press(ZCircusKeyboardQwerty.enter).press(ZCircusKeyboardQwerty.enter);
    });

    builder = builder.press(ZCircusKeyboardQwerty.tab);

    const input = await this._input();
    await input.perform(builder.build());
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

  /**
   * Gets an adornment container.
   *
   * @param which
   *        Which container to query (prefix or suffix).
   *
   * @returns
   *        The adornment container or null if no such container exists.
   */
  private async _adornment(which: 'start' | 'end'): Promise<IZCircusDriver | null> {
    const query = `.ZText-adornment-${which}`;
    const [adornment] = await this.driver.query(query);
    return adornment || null;
  }

  /**
   * Gets the prefix adornment container.
   *
   * @returns
   *        The prefix adornment container or undefined if there is no
   *        such adornment.
   */
  public prefix: () => Promise<IZCircusDriver | null> = this._adornment.bind(this, 'start');

  /**
   * Gets the suffix adornment container.
   *
   * @returns
   *        The suffix adornment container or undefined if there is no
   *        such adornment.
   */
  public suffix: () => Promise<IZCircusDriver | null> = this._adornment.bind(this, 'end');
}
