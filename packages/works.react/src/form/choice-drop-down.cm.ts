import { IZCircusPerformer, IZCircusWait, required, ZCircusActBuilder } from '@zthun/works.cirque';
import { find } from 'lodash';
import { ZChoiceOptionComponentModel } from './choice-option.cm';

/**
 * Represents a React Component Model that describes a ZChoice component.
 */
export class ZChoiceDropDownComponentModel {
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
   * Gets the menu for the drop down.
   */
  private get _menu() {
    return document.body.querySelector<HTMLElement>('.ZChoice-drop-down-menu');
  }

  /**
   * Opens the drop down.
   *
   * @returns
   *        The list of options revealed from the drop down opening.
   */
  public async open(): Promise<ZChoiceOptionComponentModel[]> {
    if (this._menu == null) {
      const query = '.ZChoice-drop-down .MuiSelect-select';
      const toggler = await required(this._element.querySelector<HTMLElement>(query));
      const act = new ZCircusActBuilder().moveTo(toggler).leftMouseClick().build();
      await this._performer.perform(act);
      await this._wait.wait(() => this._menu != null);
    }

    const menu = await required(this._menu);
    const options = Array.from(menu.querySelectorAll<HTMLElement>('.ZChoice-option'));
    return options.map((e) => new ZChoiceOptionComponentModel(e));
  }

  /**
   * Closes the drop down if it is open.
   *
   * @returns
   *        A promise that resolves once the drop down is
   *        closed.
   */
  public async close(): Promise<void> {
    return Promise.resolve();
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
   * Performs a selection on a specific option.
   *
   * @param option The option to select.
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
