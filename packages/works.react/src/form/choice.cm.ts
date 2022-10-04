import { IZCircusPerformer, IZCircusWait, ZCircusActBuilder } from '@zthun/works.cirque';
import { find } from 'lodash';
import { ZChoiceOptionComponentModel } from './choice-option.cm';

/**
 * Represents a generic common implementation of a ZChoiceComponent model.
 */
export abstract class ZChoiceComponentModel {
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
    protected readonly _element: HTMLElement,
    protected readonly _performer: IZCircusPerformer,
    protected readonly _wait: IZCircusWait
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
  public abstract open(): Promise<ZChoiceOptionComponentModel[]>;

  /**
   * Closes the options in the case that they can be hidden.
   */
  public abstract close(): Promise<void>;

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
