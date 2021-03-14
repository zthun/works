/**
 * Represents a component that can redirect to another entity.
 */
export interface IZComponentEntityRedirect<T> {
  /**
   * Occurs when an entity redirect is requested.
   *
   * @param entity The entity for the redirect.
   *
   * @returns Anything you want.
   */
  onEntity(entity: T): any;
}
