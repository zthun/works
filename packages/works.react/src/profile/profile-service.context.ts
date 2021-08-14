import { ZHttpService } from '@zthun/works.http';
import { createContext, useContext } from 'react';
import { ZProfileService } from './profile-service.class';
import { IZProfileService } from './profile-service.interface';

/**
 * The context provider that holds the profile service.
 */
export const ZProfileServiceContext = createContext<IZProfileService>(new ZProfileService(new ZHttpService()));

/**
 * Returns the context profile service.
 *
 * @returns The profile service.
 */
export function useProfileService(): IZProfileService {
  return useContext(ZProfileServiceContext);
}
