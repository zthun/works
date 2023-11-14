import { IZHttpService, ZHttpRequestBuilder, ZHttpService } from '@zthun/webigail-http';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Represents a service that can retrieve the health information for an api.
 */
export interface IZHealthService {
  /**
   * Reads the health information.
   *
   * @returns A promise that resolves to true if the system is healthy, false, otherwise.
   */
  read(): Promise<boolean>;
}

/**
 * Represents the implementation of the service for the health of an api.
 */
export class ZHealthService implements IZHealthService {
  /**
   * Gets the url for the health service.
   *
   * @returns The url for the health service.
   */
  public static createHealthUrl(): string {
    return new ZUrlBuilder().api(location).append('health').build();
  }

  /**
   * Initializes a new instance of this object.
   *
   * @param _http The service to make http calls.
   */
  public constructor(private readonly _http: IZHttpService) {}

  /**
   * Reads the health information.
   *
   * @returns A promise that resolves to true if the system is healthy, false, otherwise.
   */
  public async read(): Promise<boolean> {
    try {
      const request = new ZHttpRequestBuilder().get().url(ZHealthService.createHealthUrl()).build();
      await this._http.request<boolean>(request);
      return true;
    } catch (err) {
      return false;
    }
  }
}

/**
 * The context provider that stores the health service implementation.
 */
export const ZHealthServiceContext = createContext<IZHealthService>(new ZHealthService(new ZHttpService()));

/**
 * A hook that returns the current implementation of the health service.
 *
 * @returns The current implementation of the health service
 */
export const useHealthService = () => useContext(ZHealthServiceContext);
/**
 * A hook that returns the current health of the api.
 *
 * @returns The current health of the api along with a method to refresh it.
 *          Returns undefined if the health check is loading.
 */
export function useHealth(): [boolean | null | undefined, () => Promise<void>] {
  const [health, setHealth] = useState<boolean | null | undefined>(undefined);
  const service = useHealthService();

  /**
   * Refreshes the current health.
   */
  async function refresh() {
    await Promise.resolve();
    setHealth(undefined);
    const result = await service.read();
    setHealth(result);
  }

  useEffect(() => {
    refresh();
  }, []);

  return [health, refresh];
}
