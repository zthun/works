/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ZAppsClient } from './apps.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Apps.Service',
        transport: Transport.TCP,
        options: {
          host: 'zthunworks-services-apps',
          port: 4000
        }
      }
    ])
  ],
  providers: [ZAppsClient],
  exports: [ZAppsClient]
})
/**
 * Represents a module for retrieving the apps in the system.
 */
export class ZAppsModule {}
