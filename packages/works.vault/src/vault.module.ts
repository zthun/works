/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ZVaultClient } from './vault.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Vault.Service',
        transport: Transport.TCP,
        options: {
          host: 'zthunworks-services-vault',
          port: 4000
        }
      }
    ])
  ],
  providers: [ZVaultClient],
  exports: [ZVaultClient]
})
/**
 * Represents the module that handles users.
 */
export class ZVaultModule {}
