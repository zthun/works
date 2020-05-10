import { createContext, useContext } from 'react';
import { ZAlertStack } from './alert-stack.class';

/**
 * Represents the context for the globally provided alert stack.
 */
export const ZAlertStackContext = createContext(new ZAlertStack());

/**
 * Returns the current global alert stack.
 */
export function useAlertStack(): ZAlertStack {
  return useContext(ZAlertStackContext);
}
