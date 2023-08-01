import { useAsyncState } from '@zthun/helpful-react';
import { ZHttpRequestBuilder, ZHttpService } from '@zthun/webigail-http';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { IZWebApp } from '@zthun/works.core';
import { first } from 'lodash';
import { createContext, useContext } from 'react';

/**
 * Represents a service used to retrieve the applications in the zthunworks domain.
 */
export interface IZWebAppService {
  /**
   * Get a list of all apps in the system.
   *
   * @returns
   *        A promise that resolves with every app, or a rejected
   *        promise if an error occurs.
   */
  list(): Promise<IZWebApp[]>;

  /**
   * Gets a single web application.
   *
   * @param id
   *        The id of the web app to retrieve.
   *
   * @returns
   *        The web app discovered.  Returns rejected
   *        if the web app cannot be found.
   */
  read(id: string): Promise<IZWebApp>;
}

/**
 * Represents an implementation of the IZAppService which goes through the standard zthunworks gateway app.
 */
export class ZWebAppService implements IZWebAppService {
  /**
   * Generates the url for the apps rest service.
   *
   * @returns The url for the apps rest service.
   */
  public static createWebAppsUrl(): string {
    return new ZUrlBuilder().api().append('web-apps').build();
  }

  /**
   * Initializes a new instance of this object.
   *
   * @param _http The http service to make rest api calls.
   */
  public constructor(private _http: ZHttpService) {}

  /**
   * Get a list of all apps in the system.
   *
   * @returns A promise that resolves with every app, or a rejected
   *          promise if an error occurs.
   */
  public async list(): Promise<IZWebApp[]> {
    const req = new ZHttpRequestBuilder().get().url(ZWebAppService.createWebAppsUrl()).build();
    const apps = await this._http.request<IZWebApp[]>(req);
    return apps.data;
  }

  /**
   * Gets a single web application.
   *
   * @param id
   *        The id of the web app to retrieve.
   *
   * @returns
   *        The web app discovered.  Returns rejected
   *        if the web app cannot be found.
   */
  public async read(id: string): Promise<IZWebApp> {
    const apps = await this.list();
    const app = first(apps.filter((app) => app._id === id));

    if (!app) {
      throw new Error(`The web app with id, ${id}, does not exist.`);
    }

    return app;
  }
}

/**
 * The context that contains the current implementation of the app service.
 */
export const ZWebAppServiceContext = createContext<IZWebAppService>(new ZWebAppService(new ZHttpService()));

/**
 * Returns the current implementation of the app service.
 *
 * @returns The current implementation of the app service.
 */
export function useWebAppService() {
  return useContext(ZWebAppServiceContext);
}

/**
 * Uses all web apps.
 *
 * @returns
 *        An async state of all web apps.
 */
export function useWebApps() {
  const service = useWebAppService();
  return useAsyncState(() => service.list());
}

/**
 * Uses a specific web application.
 *
 * @param id
 *        The id of the application to retrieve.
 *
 * @returns
 *        An async state of the webapp to retrieve.
 */
export function useWebApp(id: string) {
  const service = useWebAppService();
  return useAsyncState(() => service.read(id), [id]);
}

/**
 * Uses a specific web application.
 *
 * @param id
 *        The id of the application to retrieve.  If this is null or
 *        undefined, then null will be the result.
 *
 * @returns
 *        An async state of the webapp to retrieve.
 */
export function useOptionalWebApp(id: string | null | undefined) {
  const service = useWebAppService();
  return useAsyncState(() => (id ? service.read(id) : Promise.resolve(null)), [id]);
}
