import { createContext, useContext } from 'react';
import { useWatchableState } from '../store/use-watchable-state.hook';
import { ZAlertStack } from './alert-stack.class';
import { IZAlertStack } from './alert-stack.interface';

/**
 * Represents the context for the globally provided alert stack.
 */
export const ZAlertStackContext = createContext<IZAlertStack>(new ZAlertStack());

/**
 * Returns the current global alert stack.
 *
 * If you add to the stack, your component will not render.  If you need
 * your component to render when the stack changes, use @see useAlertState instead.
 *
 * @returns The current alert stack.
 */
export function useAlertStack(): IZAlertStack {
  return useContext(ZAlertStackContext);
}

/**
 * Returns the current global alert stack.
 *
 * This version of the hook will cause your component to render whenever the
 * stack changes.  If you don't need your component to render when the alert
 * stack changes, use @see useAlertStack instead.
 *
 * @returns The current alert stack.
 */
export function useAlertState(): IZAlertStack {
  const stack = useAlertStack();
  return useWatchableState(stack.list, stack.listChange, stack);
}
