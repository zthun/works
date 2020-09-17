import { IZProfile } from '@zthun/works.core';
import { createContext, useContext } from 'react';
import { useWatchableState } from '../store/use-watchable-state.hook';
import { ZDataState } from '../store/data-state.class';
import { IZDataState } from '../store/data-state.interface';
/**
 * Represents the context for the globally provided login state.
 */
export const ZLoginStateContext = createContext<IZDataState<IZProfile>>(new ZDataState<IZProfile>(null));

/**
 * Retrieves the current globally provided login state.
 *
 * A change to the login state from this hook will not refresh your component.
 * Use @see useLoginState if you need your component to refresh when the state changes.
 *
 * @returns The global login state.
 */
export function useLogin(): IZDataState<IZProfile> {
  return useContext(ZLoginStateContext);
}

/**
 * Retrieves the current globally provided login state.
 *
 * A change to the login state from this hook will refresh your component.  If you do not
 * need your component to refresh, use @see useLogin instead.
 *
 * @returns The global login state.
 */
export function useLoginState(): IZDataState<IZProfile> {
  const loginState = useLogin();
  return useWatchableState(loginState.data, loginState.dataChange, loginState);
}
