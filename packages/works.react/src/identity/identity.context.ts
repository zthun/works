import { IZProfile } from '@zthun/works.core';
import { createContext, useContext, useEffect } from 'react';
import { ZDataState } from '../store/data-state.class';
import { IZDataState } from '../store/data-state.interface';
import { useWatchableState } from '../store/use-watchable-state.hook';
import { useIdentityService } from './identity-service.context';

/**
 * The profile context.
 */
export const ZIdentityContext = createContext<IZDataState<IZProfile>>(new ZDataState<IZProfile>(null));

/**
 * Uses the global profile.
 *
 * @param refresh A flag that determines if the global profile should be refreshed.
 *
 * @returns The global profile.
 */
export function useIdentity() {
  return useContext(ZIdentityContext);
}

/**
 * Imports the workflow to load the initial profile at the root of the application.
 *
 * @returns The value of the profile context.
 */
export function useIdentityRoot() {
  const service = useIdentityService();
  const identity = useIdentity();

  useEffect(() => {
    identity.set();
    service
      .read()
      .then((p) => identity.set(p))
      .catch(() => identity.set(null));
  });

  return identity;
}

/**
 * Uses the global profile and watches it for changes.
 *
 * @returns The global profile.
 */
export function useIdentityAndWatch() {
  const identity = useIdentity();
  return useWatchableState(identity.data, identity.dataChange, identity);
}
