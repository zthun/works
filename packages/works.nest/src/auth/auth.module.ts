/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZCookiesModule, ZNotificationsModule, ZUsersModule, ZVaultModule } from '@zthun/works.microservices';
import { ZConfigModule } from '../config/config.module';
import { ZAuthConfigService } from './config/auth-config.service';
import { ZProfilesController } from './profile/profiles.controller';
import { ZProfilesService } from './profile/profiles.service';
import { ZTokensController } from './tokens/tokens.controller';
import { ZTokensService } from './tokens/tokens.service';

@Module({
  imports: [ZVaultModule, ZUsersModule, ZNotificationsModule, ZConfigModule, ZCookiesModule],
  providers: [ZTokensService, ZProfilesService, ZAuthConfigService],
  controllers: [ZTokensController, ZProfilesController],
  exports: [ZTokensService, ZAuthConfigService]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZAuthModule {}
