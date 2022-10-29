import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel } from '@zthun/works.cirque';

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
   * Gets the value of the component model.
   *
   * @returns
   *        The string value of the component.
   */
  public async value(): Promise<string | null> {
    return (await this._input()).value();
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
  public async type(text: string): Promise<string | null> {
    const act = new ZCircusActBuilder().click().type(text).build();
    const input = await this._input();
    await input.perform(act);
    return this.value();
  }
}
