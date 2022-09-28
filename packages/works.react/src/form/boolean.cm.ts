/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IZCircusPerformer, ZCircusActBuilder } from '@zthun/works.cirque';

import { ZBooleanStyle } from './boolean';

interface ZBooleanTypeImplementation {
  readonly type: ZBooleanStyle;
  readonly value: boolean | null;
  readonly disabled: boolean;

  toggle(value?: boolean): Promise<void>;
}

class ZBooleanCheckboxImplementation implements ZBooleanTypeImplementation {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element The element for the checkbox.
   */
  public constructor(public readonly type: 'checkbox' | 'switch', private readonly _element: HTMLElement, private readonly _performer: IZCircusPerformer) {}

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
}

class ZBooleanRadioImplementation implements ZBooleanTypeImplementation {
  public constructor(public readonly type: 'radio' | 'inline-radio', private readonly _element: HTMLElement, private readonly _performer: IZCircusPerformer) {}

  private get _truthy(): HTMLInputElement {
    return this._element.querySelector('.ZBoolean-radio-truthy input')!;
  }

  private get _falsy(): HTMLInputElement {
    return this._element.querySelector('.ZBoolean-radio-falsy input')!;
  }

  public get value(): boolean | null {
    // There's 4 possible states here.
    // This is a standard boolean table that represents an XOR relationship.

    // T | F | R
    // 0 | 0 | Indeterminate
    // 1 | 0 | True
    // 0 | 1 | False
    // 1 | 1 | Indeterminate

    const isTrue = this._truthy.checked;
    const isFalse = this._falsy.checked;

    if ((!isTrue && !isFalse) || (isTrue && isFalse)) {
      return null;
    }

    return isTrue;
  }

  public get disabled(): boolean {
    return this._truthy.disabled && this._falsy.disabled;
  }

  public async toggle(value?: boolean) {
    const state = value == null ? !this.value : value;
    const act = new ZCircusActBuilder()
      .moveTo(state ? this._truthy : this._falsy)
      .leftMouseClick()
      .build();
    await this._performer.perform(act);
  }
}

/**
 * Represents a react component model for the ZBoolean component.
 */
export class ZBooleanComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The root element for the boolean component.
   * @param _performer
   *        The circus performer.
   */
  public constructor(private _element: HTMLElement, private _performer: IZCircusPerformer) {}

  /**
   * Gets the specific implementation of the boolean.
   *
   * @returns The specific implementation of the boolean.
   */
  private get _impl(): ZBooleanTypeImplementation {
    const type: string = this._element.getAttribute('data-type') as ZBooleanStyle;

    switch (type) {
      case 'radio':
        return new ZBooleanRadioImplementation('radio', this._element.querySelector<HTMLElement>('.ZBoolean-radio')!, this._performer);
      case 'inline-radio':
        return new ZBooleanRadioImplementation('inline-radio', this._element.querySelector<HTMLElement>('.ZBoolean-inline-radio')!, this._performer);
      case 'switch':
        return new ZBooleanCheckboxImplementation('switch', this._element.querySelector<HTMLElement>('.ZBoolean-switch')!, this._performer);
      default:
        return new ZBooleanCheckboxImplementation('checkbox', this._element.querySelector<HTMLElement>('.ZBoolean-checkbox')!, this._performer);
    }
  }

  /**
   * Gets whether this boolean is disabled.
   *
   * @returns
   *      True if the component is disabled,
   *      false otherwise.
   */
  public get disabled(): boolean {
    return this._impl.disabled;
  }

  /**
   * Gets the boolean value of the component.
   *
   * @returns
   *        This will return true for checked, false
   *        for unchecked, and null for indeterminate.
   */
  public get value(): boolean | null {
    return this._impl.value;
  }

  /**
   * Gets the type of boolean.
   *
   * @returns
   *        The style of element for the boolean component.
   */
  public get type(): ZBooleanStyle {
    return this._impl.type;
  }

  /**
   * Activates the boolean and ensures the value is toggled to a state.
   *
   * @param value
   *        The value to ensure the toggle to.
   *
   * @returns
   *        A promise that resolves once the toggle has been made
   *        and rendered.
   */
  public toggle(value?: boolean) {
    return this._impl.toggle(value);
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
