import { IZCircusDriver, ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/works.cirque';

/**
 * Represents the component model for a popup.
 */
export class ZPopupComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPopup-root';

  /**
   * Gets the content driver of the popup.
   *
   * @returns
   *        The popup content.
   */
  public content(): Promise<IZCircusDriver> {
    return this.driver.select('.ZPopup-content');
  }

  /**
   * Gets the popup backdrop.
   *
   * @returns
   *        The popup backdrop.
   */
  public async backdrop() {
    return this.driver.select('.MuiBackdrop-root');
  }

  /**
   * Closes the popup by clicking on the backdrop.
   *
   * @returns
   *        A promise that resolves once the
   *        action has been performed.
   */
  public async close() {
    return (await this.backdrop()).perform(new ZCircusActBuilder().click().build());
  }

  /**
   * Closes the popup by pressing the escape key.
   *
   * @returns
   *        A promise that resolves once the action
   *        has been performed.
   */
  public async escape() {
    return this.driver.perform(new ZCircusActBuilder().press(ZCircusKeyboardQwerty.escape).build());
  }
}
