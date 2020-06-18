import { MouseEvent, useState } from 'react';

/**
 * Represents a hook for common interactions with buttons that open menus.
 */
export function useMenuState<T extends HTMLElement = HTMLElement>(): [T, (e: MouseEvent<T>) => void, () => void] {
  const [anchorEl, setAnchorEl] = useState<T>(null);

  function open(event: MouseEvent<T>) {
    setAnchorEl(event.currentTarget);
  }

  function close() {
    setAnchorEl(null);
  }

  return [anchorEl, open, close];
}
