import { IZWebApp } from '@zthun/works.core';
import { ZHttpRequestBuilder, ZHttpService } from '@zthun/works.http';
import { ZUrlBuilder } from '@zthun/works.url';
import { createContext, useContext } from 'react';

/**
 * Represents a service used to retrieve the applications in the zthunworks domain.
 */
export interface IZWebAppService {
  /**
   * Get a list of all apps in the system.
   *
   * @returns A promise that resolves with every app, or a rejected
   *          promise if an error occurs.
   */
  list(): Promise<IZWebApp[]>;
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
