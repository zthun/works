import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/works.core';
import { IZDatabase } from '@zthun/works.dal';
import { ZVaultCollections, ZVaultDatabase } from './vault.database';

@Controller()
/**
 * Represents the service that can be used to read configuration from the vault database.
 */
export class ZVaultService {
  /**
   * Initializes a new instance of this object.
   *
   * @param _dal The data access layer used to communicate with the vault database.
   */
  public constructor(@Inject(ZVaultDatabase.Token) private readonly _dal: IZDatabase) {}

  /**
   * Reads a configuration item by scope and key.
   *
   * @param payload The data payload that contains the scope and key.
   *
   * @returns A promise that, when resolved, has the configuration for the specified scope and key in the
   *          payload.  Resolves to null if non such scope and key exists.
   */
  @MessagePattern({ cmd: 'read' })
  public async read<T>({ scope, key }: { scope: string; key: string }): Promise<IZConfigEntry<T>> {
    const [existing] = await this._dal.read<IZConfigEntry<T>>(ZVaultCollections.Configs).filter({ scope, key }).run();
    return existing;
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
   * @returns A promise that, when resolved, gives the existing config.
   */
  @MessagePattern({ cmd: 'get' })
  public async get<T>({ entry }: { entry: IZConfigEntry<T> }): Promise<IZConfigEntry<T>> {
    let config = await this.read<T>({ scope: entry.scope, key: entry.key });

    if (!config) {
      config = new ZConfigEntryBuilder().copy(entry).build();
      [config] = await this._dal.create(ZVaultCollections.Configs, [config]).run();
    }

    return config;
  }

  /**
   * Adds a configuration entry or updates an existing entry.
   *
   * @param param0 The configuration entry to add or update.
   *
   * @returns A promise that, when resolve, returns the updated value.
   */
  @MessagePattern({ cmd: 'put' })
  public async put<T>({ entry }: { entry: IZConfigEntry<T> }): Promise<IZConfigEntry<T>> {
    let config = await this.read<T>({ scope: entry.scope, key: entry.key });

    if (!config) {
      const items = [entry];
      [config] = await this._dal.create<IZConfigEntry<T>>(ZVaultCollections.Configs, items).run();
    } else {
      await this._dal.update<IZConfigEntry>(ZVaultCollections.Configs, config).filter({ _id: config._id }).run();
    }

    return config;
  }
}
