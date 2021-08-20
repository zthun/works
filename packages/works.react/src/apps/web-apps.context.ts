import { IZWebApp } from '@zthun/works.core';
import { createContext, useContext, useEffect } from 'react';
import { ZDataState } from '../store/data-state.class';
import { IZDataState } from '../store/data-state.interface';
import { useWatchableState } from '../store/use-watchable-state.hook';
import { useWebAppService } from './web-app-service.context';

/**
 * Represents the context for the global list of web apps that the nav bar should link to.
 */
export const ZWebAppsContext = createContext<IZDataState<IZWebApp[]>>(new ZDataState<IZWebApp[]>(null));

/**
 * Gets the current list of web apps.
 *
 * @returns The current list of web apps.
 */
export const useWebApps: () => IZDataState<IZWebApp[]> = useContext.bind(null, ZWebAppsContext);

/**
 * Imports the workflow to load the initial set of web apps at the root of the application.
 *
 * @returns The value of the web apps context.
 */
export function useWebAppsRoot() {
  const service = useWebAppService();
  const apps = useWebApps();

  useEffect(() => {
    apps.set();
    service
      .list()
      .then((a) => apps.set(a))
      .catch(() => apps.set(null));
  });

  return apps;
}

/**
 * Returns the current list of web apps and watches the web app list for changes.
 *
 * @returns The current list of web apps.
 */
export function useWebAppsAndWatch() {
  const apps = useWebApps();
  return useWatchableState(apps.data, apps.dataChange, apps);
}
