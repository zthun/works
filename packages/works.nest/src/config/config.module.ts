/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { IZConfigEntry, IZServer, ZConfigEntryBuilder, ZServerBuilder } from '@zthun/works.core';
import { ZVaultClient, ZVaultModule } from '@zthun/works.microservices';

export enum ZConfigScope {
  Common = 'common',
  Notifications = 'notifications',
  Identity = 'identity'
}

export const ZConfigEntries = Object.freeze({
  [ZConfigScope.Common]: {
    domain: new ZConfigEntryBuilder<string>().scope(ZConfigScope.Common).key('domain').value('zthunworks.com').build()
  },
  [ZConfigScope.Notifications]: {
    smtp: new ZConfigEntryBuilder<IZServer>().scope(ZConfigScope.Notifications).key('smtp').value(new ZServerBuilder().address(`smtp.zthunworks.com`).port(25).build()).build(),
    notifier: new ZConfigEntryBuilder<string>().scope(ZConfigScope.Notifications).key('notifier').value('notifications@zthunworks.com').build()
  },
  [ZConfigScope.Identity]: {
    secret: new ZConfigEntryBuilder<string>().scope(ZConfigScope.Identity).key('secret').generate().build()
  }
});

@Module({
  imports: [ZVaultModule]
})
/**
 * Represents a module for handling basic zthunworks configurations.
 *
 * This module doesn't actually get you anything other than an immediate initialization
 * of all default values in the database.  It is useful to include this module by default
 * just to make sure that everything is initialized properly.
 */
export class ZConfigModule {
  /**
   * Initializes a new instance of this object.
   *
   * @param _vault The client for the vault.
   */
  public constructor(private _vault: ZVaultClient) {}

  /**
   * Initializes all of the base configuration values in the vault.
   *
   * @returns A promise that, when resolved, has initialized all configurations.
   */
  public async onModuleInit(): Promise<any> {
    let initializers: Promise<any>[] = [];

    const scopes = Object.keys(ZConfigEntries);
    scopes.forEach((scope) => {
      const entries = Object.values<IZConfigEntry<any>>(ZConfigEntries[scope]);
      initializers = initializers.concat(entries.map((entry) => this._vault.get(entry)));
    });

    await Promise.all(initializers);
  }
}
