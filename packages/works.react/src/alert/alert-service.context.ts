import { IZAlertService, ZAlertService } from '@zthun/works.message';
import { createContext, useContext } from 'react';

/**
 * The service for creating and retrieving alerts.
 */
export const ZAlertServiceContext = createContext<IZAlertService>(new ZAlertService());

/**
 * Returns the global implementation of the alert service.
 *
 * @returns The global implementation of the alert service.
 */
export function useAlertService() {
  return useContext(ZAlertServiceContext);
}
