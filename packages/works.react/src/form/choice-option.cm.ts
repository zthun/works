import { firstDefined } from '@zthun/works.core';

/**
 * Represents a choice option or value in the Choice component model.
 */
export class ZChoiceOptionComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param element
   *        The element that represents the root of the model.
   */
  public constructor(public readonly element: HTMLElement) {}

  /**
   * Gets the value from the data-value attribute.
   */
  public get value(): string | null {
    return this.element.getAttribute('data-value');
  }

  /**
   * Gets the raw text string of the value.
   */
  public get text(): string {
    return firstDefined<string>('', this.element.textContent);
  }
}
