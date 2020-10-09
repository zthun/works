/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/works.dal';
import { env } from 'process';
import { ZVaultService } from '../vault/vault.service';
import { ZCommonConfigService } from './common-config.service';
import { ZVaultDatabase } from './vault.database';

const DATABASE_URL = env.DATABASE_VAULT_URL || env.DATABASE_URL || null;
const DATABASE_OPTIONS = new ZDatabaseOptionsBuilder().database(ZVaultDatabase.Name).url(DATABASE_URL).build();

@Module({
  providers: [ZVaultService, ZCommonConfigService, { provide: ZVaultDatabase.Token, useValue: ZDatabaseMongo.connect(DATABASE_OPTIONS) }],
  exports: [ZVaultService, ZCommonConfigService]
})
/**
 * Represents the module that interacts with the vault database.
 */
export class ZVaultModule {}
