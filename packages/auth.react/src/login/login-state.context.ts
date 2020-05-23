import { createContext, useContext } from 'react';
import { ZLoginState } from './login-state.class';

export const ZLoginStateContext = createContext(new ZLoginState(() => Promise.resolve(false)));

export function useLoginState() {
  return useContext(ZLoginStateContext);
}
