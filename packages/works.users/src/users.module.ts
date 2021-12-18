/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ZUsersPort, ZUsersToken } from './users.config';
import { ZUsersClient } from './users.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ZUsersToken,
        transport: Transport.TCP,
        options: {
          host: 'zthunworks-services-users',
          port: ZUsersPort
        }
      }
    ])
  ],
  providers: [ZUsersClient],
  exports: [ZUsersClient]
})
/**
 * Represents the module that handles users.
 */
export class ZUsersModule {}
