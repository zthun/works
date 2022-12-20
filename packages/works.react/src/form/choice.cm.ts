import { ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/works.cirque';
import { findIndex } from 'lodash';
import { ZChoiceOptionComponentModel } from './choice-option.cm';

/**
 * Represents a generic common implementation of a ZChoiceComponent model.
 */
export class ZChoiceComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZChoice-root';

  /**
   * Gets the selector text by a specific name.
   *
   * @param name
   *        The name of the choice to query.
   *
   * @returns
   *        The css selector that can query for the given choice.
   */
  public static selector(name: string) {
    return `${ZChoiceComponentModel.Selector}[data-name="${name}"]`;
  }

  /**
   * Gets the list of selected items.
   *
   * @returns
   *        The list of selected items.
   */
  public async selected(): Promise<ZChoiceOptionComponentModel[]> {
    const values = await this.driver.query('.ZChoice-value');
    return Array.from(values).map((e) => new ZChoiceOptionComponentModel(e));
  }

  /**
   * Gets whether the options list is visible.
   *
   * @returns
   *        True if the options list is visible.  False otherwise.
   */
  public async opened() {
    const body = await this.driver.body();
    return body.peek('.ZChoice-options');
  }

  /**
   * Force shows the options in the case that they are hidden.
   *
   * @returns
   *        The list of available options.
   */
  public async open(): Promise<ZChoiceOptionComponentModel[]> {
    const opened = await this.opened();

    if (!opened) {
      const toggler = await this.driver.select('.ZChoice-root .ZChoice-toggler');
      const act = new ZCircusActBuilder().click().build();
      await toggler.perform(act);
      await toggler.wait(() => this.opened());
    }

    const body = await this.driver.body();
    const menu = await body.select('.ZChoice-options');
    const options = await menu.query('.ZChoice-option');
    return options.map((e) => new ZChoiceOptionComponentModel(e));
  }

  /**
   * Closes the option list if it is open.
   *
   * This does nothing if the list is persistent.
   *
   * @returns
   *        A promise that resolves once the list is
   *        hidden.
   */
  public close(): Promise<void> {
    const act = new ZCircusActBuilder().press(ZCircusKeyboardQwerty.escape).build();
    return this.driver.perform(act);
  }

  /**
   * Performs a selection on a specific option.
   *
   * @param option
   *        The option to select.
   */
  public async select(option: ZChoiceOptionComponentModel | string | number): Promise<void> {
    const options = await this.open();
    const value = await (option instanceof ZChoiceOptionComponentModel
      ? option.value()
      : Promise.resolve(String(option)));

    const values = await Promise.all(options.map((op) => op.value()));
    const optionToSelect = findIndex(values, (v) => v === value);

    if (optionToSelect >= 0) {
      const context = options[optionToSelect];
      const act = new ZCircusActBuilder().click().build();
      await context.driver.perform(act);
    }

    await this.close();
  }

  /**
   * Clears the drop down selection if the drop down is not indelible
   */
  public async clear(): Promise<void> {
    const [cross] = await this.driver.query('.ZChoice-clear');

    if (!cross) {
      return;
    }

    const act = new ZCircusActBuilder().click().build();
    await cross.perform(act);
  }
}
