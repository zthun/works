import { IZCircusPerformer } from '@zthun/works.cirque';

/**
 * Represents a React Component Model that describes a ZChoice component.
 */
export class ZChoiceComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _element The element that represents the root of the ZChoice object.
   */
  public constructor(private readonly _element: HTMLElement, private readonly _performer: IZCircusPerformer) {}

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
