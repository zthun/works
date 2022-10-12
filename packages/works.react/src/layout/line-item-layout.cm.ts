import { required } from '@zthun/works.core';

/**
 * A component model for the ZLineItem.
 *
 * This mostly is just here to help you get the containers for the prefix, body, and suffix.
 */
export class ZLineItemLayoutComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element
   *        The root element that contains the component model.
   */
  public constructor(private _element: HTMLElement) {}

  /**
   * Returns the prefix element.
   *
   * @returns
   *        The prefix element.
   */
  public prefix(): Promise<HTMLElement> {
    return required(this._element.querySelector<HTMLElement>('.ZLineItemLayout-prefix'));
  }

  /**
   * Returns the body element.
   *
   * @returns
   *        The body element.
   */
  public body(): Promise<HTMLElement> {
    return required(this._element.querySelector<HTMLElement>('.ZLineItemLayout-body'));
  }

  /**
   * Returns the suffix element.
   *
   * @returns
   *        The suffix element.
   */
  public suffix(): Promise<HTMLElement> {
    return required(this._element.querySelector<HTMLElement>('.ZLineItemLayout-suffix'));
  }

  /**
   * Finds all possible line item components in the specific container.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        The list of available elements under the container that
   *        can be considered ZLineItemLayout components.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    const query = '.ZLineItemLayout-root';
    return Array.from(container.querySelectorAll<HTMLElement>(query));
  }
}
