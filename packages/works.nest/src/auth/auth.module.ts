/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZUsersModule } from '../users/users.module';
import { ZVaultModule } from '../vault/vault.module';
import { ZProfilesController } from './profile/profiles.controller';
import { ZTokensController } from './tokens/tokens.controller';
import { ZTokensService } from './tokens/tokens.service';

@Module({
  imports: [ZVaultModule, ZUsersModule],
  providers: [ZTokensService],
  controllers: [ZTokensController, ZProfilesController],
  exports: [ZVaultModule, ZUsersModule, ZTokensService]
})
export class ZAuthModule {}
