/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZVaultModule } from '../vault/vault.module';
import { ZEmailService } from './email.service';
import { ZNotificationsConfigService } from './notifications-config.service';

@Module({
  imports: [ZVaultModule],
  providers: [ZEmailService, ZNotificationsConfigService],
  exports: [ZEmailService, ZNotificationsConfigService]
})
/**
 * Represents a module for handling notifications.
 */
export class ZNotificationsModule {}
