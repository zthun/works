import { Inject, Injectable } from '@nestjs/common';
import { IZDatabase } from '@zthun/dal';
import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/works.core';
import { ZVaultCollections } from './vault.collections';
import { ZVaultDatabase } from './vault.database';

@Injectable()
export class ZVaultService {
  public constructor(@Inject(ZVaultDatabase.Token) private readonly _dal: IZDatabase) {}

  /**
   * Reads a configuration item by scope and key.
   *
   * @param scope The configuration scope.
   * @param key The configuration key.
   *
   * @returns A promise that, when resolved, has the configuration for the specified scope and key.  Resolves
   *          to null if non such scope and key exists.
   */
  public async read<T>(scope: string, key: string): Promise<IZConfigEntry<T>> {
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
   * @param config The current configuration to read.  If the scope and key of the config exists,
   * then the existing config entity is returned, otherwise, the config value is added and
   * @returns A promise that, when resolved, gives the existing config.
   */
  public async get<T>(entry: IZConfigEntry<T>): Promise<IZConfigEntry<T>> {
    let config = await this.read<T>(entry.scope, entry.key);

    if (!config) {
      config = new ZConfigEntryBuilder().copy(entry).build();
      [config] = await this._dal.create(ZVaultCollections.Configs, [config]).run();
    }

    return config;
  }

  /**
   * Adds a configuration entry or updates an existing entry.
   *
   * @param entry The configuration entry to add or update.
   *
   * @returns A promise that, when resolve, returns the updated value.
   */
  public async put<T>(entry: IZConfigEntry<T>): Promise<IZConfigEntry<T>> {
    let config = await this.read<T>(entry.scope, entry.key);

    if (!config) {
      const items = [entry];
      [config] = await this._dal.create<IZConfigEntry<T>>(ZVaultCollections.Configs, items).run();
    } else {
      await this._dal.update<IZConfigEntry>(ZVaultCollections.Configs, config).filter({ _id: config._id }).run();
    }

    return config;
  }
}
