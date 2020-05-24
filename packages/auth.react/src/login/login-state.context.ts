import { createContext, useContext } from 'react';
import { useWatchableState } from '../common/use-watchable-state.hook';
import { ZLoginState } from './login-state.class';
import { IZLoginState } from './login-state.interface';

/**
 * Represents the context for the globally provided login state.
 */
export const ZLoginStateContext = createContext(new ZLoginState(() => Promise.resolve(false)));

/**
 * Retrieves the current globally provided login state.
 *
 * A change to the login state from this hook will not refresh your component.
 * Use @see useLoginState if you need your component to refresh when the state changes.
 *
 * @returns The global login state.
 */
export function useLogin(): IZLoginState {
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
export function useLoginState(): IZLoginState {
  const loginState = useLogin();
  return useWatchableState(loginState.logged, loginState);
}
