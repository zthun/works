import { ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/works.cirque';
import { firstDefined } from '@zthun/works.core';

/**
 * Represents a component model for a single square in the ZFashionGrid.
 */
export class ZFashionBlockComponentModel extends ZCircusComponentModel {
  public static readonly Class = 'ZFashionGrid-shade';
  public static readonly Selector = `.${ZFashionBlockComponentModel.Class}`;

  /**
   * Gets the block hue.
   *
   * @returns
   *      The hue for the block.
   */
  public async hue(): Promise<string> {
    const hue = await this.driver.attribute('data-hue');
    return firstDefined('transparent', hue);
  }

  /**
   * Gets the block shade.
   *
   * @returns
   *        The block shade.
   */
  public async shade(): Promise<number> {
    const _shade = await this.driver.attribute('data-shade');
    const shade = firstDefined('0', _shade);
    return +shade;
  }

  /**
   * Clicks the block with the shift key held.
   */
  public async toggle() {
    const act = new ZCircusActBuilder()
      .keyDown(ZCircusKeyboardQwerty.shiftLeft)
      .click()
      .keyUp(ZCircusKeyboardQwerty.shiftLeft)
      .build();
    await this.driver.perform(act);
  }

  /**
   * Clicks the block to select it.
   */
  public async click() {
    await this.driver.perform(new ZCircusActBuilder().click().build());
  }

  /**
   * Clicks the enter key to select the block.
   */
  public async enter() {
    await this.driver.perform(new ZCircusActBuilder().press(ZCircusKeyboardQwerty.enter).build());
  }

  /**
   * Clicks the space key to select the block.
   */
  public async space() {
    await this.driver.perform(new ZCircusActBuilder().press(ZCircusKeyboardQwerty.space).build());
  }
}
