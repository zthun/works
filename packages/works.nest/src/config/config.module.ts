/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZVaultModule } from '@zthun/works.microservices';
import { ZCommonConfigService } from './common-config.service';
import { ZNotificationsConfigService } from './notifications-config.service';

@Module({
  imports: [ZVaultModule],
  providers: [ZCommonConfigService, ZNotificationsConfigService],
  exports: [ZCommonConfigService, ZNotificationsConfigService]
})
/**
 * Represents a module for handling notifications.
 */
export class ZConfigModule {}
