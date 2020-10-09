import { MouseEvent, useState } from 'react';

/**
 * Represents a hook for common interactions with buttons that open menus.
 *
 * @returns A 3 item tuple where the first element is the menu open anchor, the second element is the method to open the menu, and the third element is to close the menu.
 */
export function useMenuState<T extends HTMLElement = HTMLElement>(): [T, (e: MouseEvent<T>) => void, () => void] {
  const [anchorEl, setAnchorEl] = useState<T>(null);

  /**
   * Opens the menu.
   *
   * @param event The mouse event that contains the target for where the menu was opened under.
   */
  function open(event: MouseEvent<T>) {
    setAnchorEl(event.currentTarget);
  }

  /**
   * Closes the opened menu.
   */
  function close() {
    setAnchorEl(null);
  }

  return [anchorEl, open, close];
}
