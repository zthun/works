import { ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/works.cirque';
import { findIndex } from 'lodash';
import { ZChoiceOptionComponentModel } from './choice-option.cm';

/**
 * Represents a generic common implementation of a ZChoiceComponent model.
 */
export class ZChoiceComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZChoice-root';

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
   * Gets a value that determines if the choice component is disabled.
   *
   * @returns
   *        True if the choice component is disabled.  False otherwise.
   */
  public async disabled(): Promise<boolean> {
    const input = await this.driver.select('input');
    return input.disabled();
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
  public async close(): Promise<void> {
    const act = new ZCircusActBuilder().press(ZCircusKeyboardQwerty.escape).build();
    await this.driver.perform(act);
    await this.driver.wait(() => this.opened().then((b) => !b));
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

    let values = await Promise.all(options.map((op) => op.value()));
    let optionToSelect = findIndex(values, (v) => v === value);

    if (optionToSelect < 0) {
      values = await Promise.all(options.map((op) => op.text()));
      optionToSelect = findIndex(values, (v) => v === value);
    }

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
