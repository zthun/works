import { createContext, useContext } from 'react';

/**
 * Represents the window context.
 */
export const ZWindowServiceContext = createContext(global);

/**
 * Gets the current window object.
 *
 * @returns The current window object.
 */
export function useWindowService() {
  return useContext(ZWindowServiceContext);
}
