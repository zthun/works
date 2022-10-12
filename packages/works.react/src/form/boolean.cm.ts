/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IZCircusPerformer, ZCircusActBuilder } from '@zthun/works.cirque';

/**
 * Represents a react component model for the ZBoolean component.
 */
export class ZBooleanComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element The element for the checkbox.
   */
  public constructor(private readonly _element: HTMLElement, private readonly _performer: IZCircusPerformer) {}

  /**
   * Gets the underlying input element.
   *
   * @returns
   *        The underlying input element.
   */
  private get _input(): HTMLInputElement {
    return this._element.querySelector('input[type="checkbox"]')!;
  }

  /**
   * Gets whether this boolean is disabled.
   *
   * @returns
   *      True if the component is disabled,
   *      false otherwise.
   */
  public get disabled(): boolean {
    return this._input.disabled;
  }

  /**
   * Gets the value of the input check state for the checkbox.
   *
   * @returns
   *        The check state value or null if indeterminate.
   */
  public get value(): boolean | null {
    const input = this._input;
    return input.getAttribute('data-indeterminate') === 'true' ? null : input.checked;
  }

  /**
   * Toggles the checkbox.
   *
   * @param value
   *        The value to toggle to.  If this is
   *        undefined, then the input is simply
   *        clicked and that ends the operation.
   *
   * @returns
   *        A promise that resolves once the toggle
   *        has reached the given state.
   */
  public async toggle(value?: boolean) {
    if (this.value === value) {
      // Already in the state we need to be in.
      return;
    }

    const act = new ZCircusActBuilder().moveTo(this._input).leftMouseClick().build();
    await this._performer.perform(act);
  }

  /**
   * Finds all elements in the dom that can be considered ZBoolean objects.
   *
   * @param container
   *        The container to search in.
   *
   * @returns
   *        The array of HTMLElements that can be considered ZBoolean
   *        components.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZBoolean-root'));
  }
}
