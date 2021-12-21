import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IZWebApp } from '@zthun/works.core';
import { lastValueFrom } from 'rxjs';

@Injectable()
/**
 * Represents a service to send emails.
 */
export class ZAppsClient {
  /**
   * Initializes a new instance of this object.
   *
   * @param _apps The client proxy to access the microservice over transport.
   */
  public constructor(@Inject('Apps.Service') private readonly _apps: ClientProxy) {}

  /**
   * Generates a list of all the web apps available.
   *
   * @returns A promise of all the available apps.
   */
  public async listWebApps(): Promise<IZWebApp[]> {
    return lastValueFrom(this._apps.send({ cmd: 'listWebApps' }, {}));
  }
}
