/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZEmailService } from './email.service';

@Module({
  providers: [ZEmailService],
  exports: [ZEmailService]
})
export class ZNotificationsModule {}
