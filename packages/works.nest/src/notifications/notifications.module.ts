/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZEmailService } from './email.service';
import { ZNotificationsConfigService } from './notifications-config.service';

@Module({
  providers: [ZEmailService, ZNotificationsConfigService],
  exports: [ZEmailService, ZNotificationsConfigService]
})
export class ZNotificationsModule {}
