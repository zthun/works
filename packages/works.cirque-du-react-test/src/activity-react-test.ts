import { fireEvent } from '@testing-library/react';
import { IZActivity } from '@zthun/works.cirque';

/**
 * Represents a single activity.
 *
 * You can combine these in a performance.
 */
export class ZActivityReactTest implements IZActivity {
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
  public async click(element: Element): Promise<void> {
    fireEvent.click(element);
  }
}
