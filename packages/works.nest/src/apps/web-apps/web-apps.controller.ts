import { Controller, Get } from '@nestjs/common';
import { IZWebApp } from '@zthun/works.core';
import { ZAppsService } from '../apps.service';

@Controller('web-apps')
/**
 * A controller that enables the available web apps for the domain.
 */
export class ZWebAppsController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _apps The service used to retrieve all apps.
   */
  public constructor(private readonly _apps: ZAppsService) {}

  /**
   * Gets the list of all web apps available.
   *
   * @returns A promise that resolves with all available web apps.
   */
  @Get()
  public list(): Promise<IZWebApp[]> {
    return this._apps.listWebApps();
  }
}
