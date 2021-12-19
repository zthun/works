import { Injectable, OnModuleInit } from '@nestjs/common';
import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/works.core';
import { ZVaultClient } from '@zthun/works.microservices';

@Injectable()
/**
 * Represents a service for common configuration throughout the system.
 */
export class ZCommonConfigService implements OnModuleInit {
  /**
   * The scope for the common config.
   */
  public static readonly SCOPE = 'common';

  /**
   * The key for the domain config.
   */
  public static readonly KEY_DOMAIN = 'domain';

  /**
   * The default value for the domain config.
   */
  public static readonly DEFAULT_DOMAIN = 'zthunworks.com';

  /**
   * Initializes a new instance of this object.
   *
   * @param _vault The service for reading and writing to the vault.
   */
  public constructor(private readonly _vault: ZVaultClient) {}

  /**
   * Initializes this service.
   *
   * @returns A promise that, when resolved, has initialized all configurations.
   */
  public async onModuleInit(): Promise<any> {
    return Promise.all([this.domain()]);
  }

  /**
   * Gets the current domain that the site lives on.
   *
   * @returns A promise that, when resolved, has returned the core domain for the application.
   */
  public async domain(): Promise<IZConfigEntry<string>> {
    const config = new ZConfigEntryBuilder<string>().scope(ZCommonConfigService.SCOPE).key(ZCommonConfigService.KEY_DOMAIN).value(ZCommonConfigService.DEFAULT_DOMAIN).build();
    return this._vault.get<string>(config);
  }
}
