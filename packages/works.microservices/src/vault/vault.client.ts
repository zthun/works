import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IZConfigEntry } from '@zthun/works.core';
import { lastValueFrom } from 'rxjs';

@Injectable()
/**
 * Represents the service that can be used to read configuration from the vault database.
 */
export class ZVaultClient {
  /**
   * Initializes a new instance of this object.
   *
   * @param _vault The client proxy used to connect to the vault microservice.
   */
  public constructor(@Inject('Vault.Service') private readonly _vault: ClientProxy) {}

  /**
   * Reads a configuration item by scope and key.
   *
   * @param scope The configuration scope.
   * @param key The configuration key.
   *
   * @returns A promise that, when resolved, has the configuration for the specified scope and key.  Resolves
   *          to null if non such scope and key exists.
   */
  public async read<T>(scope: string, key: string): Promise<IZConfigEntry<T> | null> {
    return lastValueFrom(this._vault.send({ cmd: 'read' }, { scope, key }));
  }

  /**
   * Gets the existing configuration value.
   *
   * If no config with the given scope and key exists, then the
   * configuration is added with the value.  Otherwise, the value
   * is overwritten with the stored value.
   *
   * @param entry The current configuration to read.  If the scope and key of the config exists,
   *              then the existing config entity is returned, otherwise, the config value is added and
   *              the new config value is returned.
   *
   * @returns A promise that, when resolved, gives the existing config.
   */
  public async get<T>(entry: IZConfigEntry<T>): Promise<IZConfigEntry<T>> {
    return lastValueFrom(this._vault.send({ cmd: 'get' }, { entry }));
  }

  /**
   * Adds a configuration entry or updates an existing entry.
   *
   * @param entry The configuration entry to add or update.
   *
   * @returns A promise that, when resolve, returns the updated value.
   */
  public async put<T>(entry: IZConfigEntry<T>): Promise<IZConfigEntry<T>> {
    return lastValueFrom(this._vault.send({ cmd: 'put' }, { entry }));
  }
}
