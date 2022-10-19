import { required } from '@zthun/works.core';

/**
 * The component model for a border layout component.
 */
export class ZBorderLayoutComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param element
   *        The element that represents the root of the
   *        component.
   */
  public constructor(public readonly element: HTMLElement) {}

  /**
   * Gets the border information.
   *
   * @returns
   *        The border information.
   */
  public async borderColor() {
    return required(this.element.getAttribute('data-border-color'));
  }

  /**
   * Gets the border size.
   *
   * @returns
   *         The border size.
   */
  public async borderSize() {
    return required(this.element.getAttribute('data-border-size'));
  }

  /**
   * Gets the border style.
   *
   * @returns
   *        The border style.
   */
  public async borderStyle() {
    return required(this.element.getAttribute('data-border-style'));
  }

  /**
   * Gets the background color information.
   *
   * @returns
   *        The background color information.
   */
  public async backgroundColor() {
    return required(this.element.getAttribute('data-background-color'));
  }

  /**
   * Gets all elements that can be considered ZBorderLayout components.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        The list of candidates that can be considered layout components.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZBorderLayout-root'));
  }
}
