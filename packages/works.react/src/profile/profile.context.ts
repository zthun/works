import { IZProfile } from '@zthun/works.core';
import { createContext, useContext, useEffect } from 'react';
import { ZDataState } from '../store/data-state.class';
import { IZDataState } from '../store/data-state.interface';
import { useWatchableState } from '../store/use-watchable-state.hook';
import { useProfileService } from './profile-service.context';

/**
 * The profile context.
 */
export const ZProfileContext = createContext<IZDataState<IZProfile>>(new ZDataState<IZProfile>(null));

/**
 * Uses the global profile.
 *
 * @param refresh A flag that determines if the global profile should be refreshed.
 *
 * @returns The global profile.
 */
export function useProfile() {
  return useContext(ZProfileContext);
}

/**
 * Imports the workflow to load the initial profile at the root of the application.
 *
 * @returns The value of the profile context.
 */
export function useProfileRoot() {
  const service = useProfileService();
  const profile = useProfile();

  useEffect(() => {
    profile.set();
    service.read().then((p) => profile.set(p));
  });

  return profile;
}

/**
 * Uses the global profile and watches it for changes.
 *
 * @returns The global profile.
 */
export function useProfileAndWatch() {
  const profile = useProfile();
  return useWatchableState(profile.data, profile.dataChange, profile);
}
