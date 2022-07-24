import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/works.core';
import { get, set } from 'lodash';
import { ZVaultClient } from './vault.client';

/**
 * Represents a VaultClient that stores data in memory.
 *
 * This just makes it easy to us the vault in unit tests.
 * You should never use this vault client in production
 */
export class ZVaultMemoryClient extends ZVaultClient {
  private _memory: any = {};

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    // We're not actually going to be using the ClientProxy so we
    // can just cheese this here.
    super({} as any);
  }

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
    const value = get(this._memory, `${scope}.${key}`);
    return value == null ? Promise.resolve(null) : Promise.resolve(new ZConfigEntryBuilder().scope(scope).key(key).value(value).build());
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
  public async get<T>(entry: IZConfigEntry<T>): Promise<IZConfigEntry<T>> {
    const value = await this.read<T>(entry.scope, entry.key);

    if (!value) {
      return this.put(entry);
    }

    return value;
  }

  /**
   * Adds a configuration entry or updates an existing entry.
   *
   * @param entry The configuration entry to add or update.
   *
   * @returns A promise that, when resolve, returns the updated value.
   */
  public async put<T>(entry: IZConfigEntry<T>): Promise<IZConfigEntry<T>> {
    set(this._memory, `${entry.scope}.${entry.key}`, entry.value);
    return Promise.resolve(new ZConfigEntryBuilder().copy(entry).build());
  }
}
