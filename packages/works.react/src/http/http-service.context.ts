import { IZHttpService, ZHttpService } from '@zthun/works.http';
import { createContext, useContext } from 'react';

/**
 * Represents the context for making http invocations.
 */
export const ZHttpServiceContext = createContext<IZHttpService>(new ZHttpService());

/**
 * Retrieves the global http service class.
 *
 * @returns The global http service class.
 */
export function useHttpService(): IZHttpService {
  return useContext(ZHttpServiceContext);
}
