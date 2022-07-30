/**
 * Represents an event for the ZMenu and it's child items.
 */
export abstract class ZMenuEvent {
  public static ItemClick = 'menuItemClick';

  /**
   * Constructs a CustomEvent object that represents when a menu item in the popup has been clicked.
   *
   * @param detail The menu item that was clicked.
   *
   * @returns A custom event object that can be listened to when
   */
  public static itemClick(detail: HTMLElement) {
    return new CustomEvent<HTMLElement>(ZMenuEvent.ItemClick, { detail, bubbles: true });
  }
}
