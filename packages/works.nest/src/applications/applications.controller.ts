import { Controller, Get, Inject } from '@nestjs/common';
import { IZVaultClient, ZVaultToken } from '@zthun/vault-client';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { ZAppsClient } from '@zthun/works.microservices';
import { ZConfigEntries } from '../config/config.module';

@Controller()
/**
 * A controller that enables the available web apps for the domain.
 */
export class ZApplicationsController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _apps The client used to retrieve all apps.
   * @param _vault The client used to retrieve system configuration values.
   */
  public constructor(
    private readonly _apps: ZAppsClient,
    @Inject(ZVaultToken) private readonly _vault: IZVaultClient
  ) {}

  /**
   * Gets the list of all web apps available.
   *
   * @returns A promise that resolves with all available web apps.
   */
  @Get('web-apps')
  public async listWebApps(): Promise<IZWebApp[]> {
    const domain = await this._vault.get(ZConfigEntries.common.domain);
    const url = new ZUrlBuilder().protocol('https').hostname(domain.value).build();
    const apps = await this._apps.listWebApps();
    return apps.map((app) => {
      const appUrl = new ZUrlBuilder().parse(url).subdomain(app._id).build();
      return new ZWebAppBuilder().copy(app).domain(appUrl).build();
    });
  }
}
