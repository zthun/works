/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { env } from 'process';
import { ZVaultService } from '../vault/vault.service';
import { ZVaultDatabase } from './vault.database';

const DATABASE_VAULT_HOST = env.DATABASE_VAULT_HOST || 'vault.database.zthunworks.com';
const DATABASE_VAULT_PORT = +env.DATABASE_VAULT_PORT || 27017;

@Module({
  providers: [ZVaultService, { provide: ZVaultDatabase.Token, useValue: ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().database(ZVaultDatabase.Name).host(DATABASE_VAULT_HOST).port(DATABASE_VAULT_PORT).build()) }],
  exports: [ZVaultService]
})
export class ZVaultModule {}
