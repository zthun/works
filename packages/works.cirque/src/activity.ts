/**
 * Represents a single activity.
 *
 * You can combine these in a performance.
 */
export interface IZActivity {
  /**
   * Click on an element in a DOM.
   *
   * @param element
   *        The element to click.
   *
   * @returns
   *        A promise when the element has
   *        been clicked.
   */
  click(element: Element): Promise<void>;
}
