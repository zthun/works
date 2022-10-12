import { IZCircusPerformer, IZCircusWait, ZCircusActBuilder } from '@zthun/works.cirque';
import { required } from '@zthun/works.core';
import { find } from 'lodash';
import { ZChoiceOptionComponentModel } from './choice-option.cm';

/**
 * Represents a generic common implementation of a ZChoiceComponent model.
 */
export class ZChoiceComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The element that represents the root of the ZChoice object.
   * @param _performer
   *        The circus performer responsible for performing user actions.
   * @param _wait
   *        The wait implementation to halt the circus.
   */
  public constructor(
    private readonly _element: HTMLElement,
    private readonly _performer: IZCircusPerformer,
    private readonly _wait: IZCircusWait
  ) {}

  /**
   * Gets the list of selected items.
   */
  public get selected(): ZChoiceOptionComponentModel[] {
    return Array.from(this._element.querySelectorAll<HTMLElement>('.ZChoice-value')).map(
      (e: HTMLElement) => new ZChoiceOptionComponentModel(e)
    );
  }

  /**
   * Force shows the options in the case that they are hidden.
   *
   * @returns The list of available options.
   */
  public async open(): Promise<ZChoiceOptionComponentModel[]> {
    if (this._findOptionContainer(document.body) == null) {
      const toggler = await this._findToggler();
      const act = new ZCircusActBuilder().moveTo(toggler).leftMouseClick().build();
      await this._performer.perform(act);
      await this._wait.wait(() => this._findOptionContainer(document.body) != null);
    }

    const menu = await required(this._findOptionContainer(document.body));
    return this._findOptions(menu);
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
    return Promise.resolve();
  }

  /**
   * Performs a selection on a specific option.
   *
   * @param option
   *        The option to select.
   */
  public async select(option: ZChoiceOptionComponentModel | string | number): Promise<void> {
    const options = await this.open();
    const value = option instanceof ZChoiceOptionComponentModel ? option.value : String(option);
    const optionToSelect = find(options, (op) => op.value === value);

    if (optionToSelect != null) {
      const act = new ZCircusActBuilder().moveTo(optionToSelect.element).leftMouseClick().build();
      await this._performer.perform(act);
    }

    await this.close();
  }

  /**
   * Clears the drop down selection if the drop down is not indelible
   */
  public async clear(): Promise<void> {
    const cross = this._element.querySelector<HTMLButtonElement>('.ZChoice-clear');

    if (!cross) {
      return;
    }

    const act = new ZCircusActBuilder().moveTo(cross).leftMouseClick().build();
    await this._performer.perform(act);
  }

  /**
   * Retrieves all of the choice options under the given container.
   *
   * @param container
   *        The container to query.
   *
   * @returns
   *        The list of options discovered under the container.
   */
  private _findOptions(container: HTMLElement) {
    const options = Array.from(container.querySelectorAll<HTMLElement>('.ZChoice-option'));
    return options.map((e) => new ZChoiceOptionComponentModel(e));
  }

  /**
   * Finds the container for the options.
   *
   * @param container
   *        The root element to search for the container.
   *
   * @returns
   *        The container element by which you can use with
   *        findOptions to query each individual option.
   */
  private _findOptionContainer(container: HTMLElement) {
    return container.querySelector<HTMLElement>('.ZChoice-options');
  }

  /**
   * Finds the element that can be clicked on to show the option list.
   *
   * @returns
   *        The element that can be clicked on to show the option list.
   */
  /**
   * Finds the element that can be clicked on to show the option list.
   *
   * @returns
   *        The element that can be clicked on to show the option list.
   */
  private _findToggler() {
    const query = '.ZChoice-root .ZChoice-toggler';
    return required(this._element.querySelector<HTMLElement>(query));
  }

  /**
   * Finds all elements in the dom that can be considered ZChoice objects.
   *
   * @param container
   *        The container to search in.
   *
   * @returns
   *        The array of HTMLElements that can be considered ZChoice
   *        components.
   */
  public static find(container: Element): HTMLElement[] {
    return Array.from(container.querySelectorAll('.ZChoice-root'));
  }
}
