/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZVaultModule } from '@zthun/works.microservices';
import { ZEmailService } from './email.service';
import { ZNotificationsConfigService } from '../config/notifications-config.service';

@Module({
  imports: [ZVaultModule],
  providers: [ZEmailService, ZNotificationsConfigService],
  exports: [ZEmailService, ZNotificationsConfigService]
})
/**
 * Represents a module for handling notifications.
 */
export class ZNotificationsModule {}
