/**
 * Represents a component model for a single item underneath a ZList.
 */
export class ZListItemComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param element
   *        The element for the list item.
   */
  public constructor(public element: HTMLElement) {}

  /**
   * Finds all elements under the container that can be considered ZListLineItem components.
   *
   * @param container
   *        The container to search.
   *
   * @returns
   *        A list of candidates that can be considered ZListItem components.
   */
  public static find(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('.ZListItem-root'));
  }
}
