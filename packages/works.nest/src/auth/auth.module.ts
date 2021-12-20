/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZCookiesModule, ZNotificationsModule, ZUsersModule } from '@zthun/works.microservices';
import { ZConfigModule } from '../config/config.module';
import { ZSecurityModule } from '../security/security.module';
import { ZProfilesController } from './profile/profiles.controller';
import { ZProfilesService } from './profile/profiles.service';
import { ZTokensController } from './tokens/tokens.controller';
import { ZTokensService } from './tokens/tokens.service';

@Module({
  imports: [ZUsersModule, ZNotificationsModule, ZConfigModule, ZCookiesModule, ZSecurityModule],
  providers: [ZTokensService, ZProfilesService],
  controllers: [ZTokensController, ZProfilesController],
  exports: [ZTokensService]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZAuthModule {}
