/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/works.dal';
import { env } from 'process';
import { ZVaultService } from '../vault/vault.service';
import { ZCommonConfigService } from './common-config.service';
import { ZVaultDatabase } from './vault.database';

const DATABASE_VAULT_PROTOCOL = env.DATABASE_VAULT_PROTOCOL || env.DATABASE_PROTOCOL || null;
const DATABASE_VAULT_HOST = env.DATABASE_VAULT_HOST || env.DATABASE_HOST || 'vault.database.zthunworks.com';
const DATABASE_VAULT_PORT = +env.DATABASE_VAULT_PORT || +env.DATABASE_PORT || 27017;
const DATABASE_VAULT_USER = env.DATABASE_VAULT_USER || env.DATABASE_USER || null;
const DATABASE_VAULT_PASSWORD = env.DATABASE_VAULT_PASSWORD || env.DATABASE_PASSWORD || null;
const DATABASE_OPTIONS = new ZDatabaseOptionsBuilder().database(ZVaultDatabase.Name).host(DATABASE_VAULT_HOST).port(DATABASE_VAULT_PORT).credentials(DATABASE_VAULT_USER, DATABASE_VAULT_PASSWORD).protocol(DATABASE_VAULT_PROTOCOL).build();

@Module({
  providers: [ZVaultService, ZCommonConfigService, { provide: ZVaultDatabase.Token, useValue: ZDatabaseMongo.connect(DATABASE_OPTIONS) }],
  exports: [ZVaultService, ZCommonConfigService]
})
export class ZVaultModule {}
