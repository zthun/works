import { createContext, useContext } from 'react';
import { ZAlertStack } from './alert-stack.class';
import { IZAlertStack } from './alert-stack.interface';

/**
 * Represents the context for the globally provided alert stack.
 */
export const ZAlertStackContext = createContext<IZAlertStack>(new ZAlertStack());

/**
 * Returns the current global alert stack.
 */
export function useAlertStack(): IZAlertStack {
  return useContext(ZAlertStackContext);
}
