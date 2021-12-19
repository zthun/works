/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ZNotificationsClient } from './notifications.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Notifications.Service',
        transport: Transport.TCP,
        options: {
          host: 'zthunworks-services-notifications',
          port: 4000
        }
      }
    ])
  ],
  providers: [ZNotificationsClient],
  exports: [ZNotificationsClient]
})
/**
 * Represents a module for handling notifications.
 */
export class ZNotificationsModule {}
