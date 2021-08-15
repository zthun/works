import { createContext, useContext } from 'react';

/**
 * Represents the window context.
 */
export const ZWindowContext = createContext<Window>(window);

/**
 * Gets the current window object.
 *
 * @returns The current window object.
 */
export function useWindow() {
  return useContext(ZWindowContext);
}
