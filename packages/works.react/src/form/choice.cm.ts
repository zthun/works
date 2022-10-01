import { IZCircusPerformer, IZCircusWait, required, ZCircusActBuilder } from '@zthun/works.cirque';
import { find } from 'lodash';
import { ZChoiceType } from './choice';
import { ZChoiceOptionComponentModel } from './choice-option.cm';

/**
 * Represents the implementation of the ZChoice component
 */
interface ZChoiceTypeImplementation {
  /**
   * Gets the type of this implementation.
   */
  readonly type: ZChoiceType;

  /**
   * Gets the selected options.
   */
  readonly selected: ZChoiceOptionComponentModel[];

  /**
   * Retrieves the options for the choice implementation.
   *
   * If the options are hidden, then this method should
   * reveal them.
   *
   * @returns
   *      The promise that reveals the available options.
   */
  open(): Promise<ZChoiceOptionComponentModel[]>;

  /**
   * Hides any options if possible.
   *
   * If the options can be hidden, then this method should
   * hide the option list.  Otherwise, it just does nothing.
   */
  close(): Promise<void>;

  /**
   * Selects a specific option.
   *
   * @param option
   *        A string or component model which represents the item
   *        to select.  If this is a string and no such option
   *        is made, then no selection changes.
   *
   * @returns
   *        A promise that resolves once the selection
   *        has been made.
   */
  select(option: ZChoiceOptionComponentModel | string | number): Promise<void>;

  /**
   * Clears the selection or does nothing if the component is indelible.
   */
  clear(): Promise<void>;
}

/**
 * Represents the drop down style of implementation for the choice component.
 */
class ZChoiceTypeDropDown implements ZChoiceTypeImplementation {
  /**
   * The type of this choice implementation.
   */
  public readonly type = ZChoiceType.DropDown;

  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The element that represents the drop down.
   * @param _performer
   *        The circus performer to perform user activities.
   */
  public constructor(
    private readonly _element: HTMLElement,
    private readonly _performer: IZCircusPerformer,
    private readonly _wait: IZCircusWait
  ) {}

  /**
   * Gets the selected option.
   */
  public get selected() {
    return Array.from(this._element.querySelectorAll<HTMLElement>('.ZChoice-value')).map(
      (e: HTMLElement) => new ZChoiceOptionComponentModel(e)
    );
  }

  /**
   * Gets the menu for the drop down.
   */
  private get _menu() {
    return document.body.querySelector<HTMLElement>('.ZChoice-select-menu');
  }

  /**
   * Opens the drop down.
   *
   * @returns
   *        The list of options revealed from the drop down opening.
   */
  public async open(): Promise<ZChoiceOptionComponentModel[]> {
    if (this._menu == null) {
      const query = '.ZChoice-select-drop-down .MuiSelect-select';
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
}

/**
 * Represents a React Component Model that describes a ZChoice component.
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
   * Gets the set implementation for the choice component.
   *
   * @returns
   *      The implementation of the choice.
   */
  private get _impl(): ZChoiceTypeImplementation {
    const type = this._element.getAttribute('data-type') as ZChoiceType;

    switch (type) {
      case ZChoiceType.ButtonGroup:
      default:
        return new ZChoiceTypeDropDown(this._element, this._performer, this._wait);
    }
  }

  /**
   * Gets the list of selected items.
   */
  public get selected(): ZChoiceOptionComponentModel[] {
    return this._impl.selected;
  }

  /**
   * Gets the type of choice component.
   */
  public get type(): ZChoiceType {
    return this._impl.type;
  }

  /**
   * Gets the options.
   *
   * This will open the component if the options are hidden.
   *
   * @returns
   *        A promise that resolves with the available options.
   */
  public open(): Promise<ZChoiceOptionComponentModel[]> {
    return this._impl.open();
  }

  /**
   * Clears all selections.
   *
   * This will do nothing if the choice is indelible.
   *
   * @returns
   *      A promise that resolves once the clear has removed
   *      all selections.
   */
  public clear(): Promise<void> {
    return this._impl.clear();
  }

  /**
   * Selects a specific option or identifier.
   *
   * @param option
   *        The option to select.  If no such option exists,
   *        then this method does nothing.
   *
   * @returns
   *        A promise that resolves once the selection has
   *        been made.
   */
  public select(option: ZChoiceOptionComponentModel | string | number): Promise<void> {
    return this._impl.select(option);
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
