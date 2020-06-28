/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZNotificationsModule } from '../notifications/notifications.module';
import { ZUsersModule } from '../users/users.module';
import { ZVaultModule } from '../vault/vault.module';
import { ZProfilesController } from './profile/profiles.controller';
import { ZProfilesService } from './profile/profiles.service';
import { ZTokensController } from './tokens/tokens.controller';
import { ZTokensService } from './tokens/tokens.service';

@Module({
  imports: [ZVaultModule, ZUsersModule, ZNotificationsModule],
  providers: [ZTokensService, ZProfilesService],
  controllers: [ZTokensController, ZProfilesController],
  exports: [ZVaultModule, ZUsersModule, ZTokensService]
})
export class ZAuthModule {}
