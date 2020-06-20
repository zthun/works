import { Module } from '@nestjs/common';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { DatabaseName } from '../common/collections.enum';
import { DatabaseToken } from '../common/injection.constants';
import { ZUsersController } from '../users/users.controller';
import { ZUsersService } from '../users/users.service';
import { ZVaultService } from '../vault/vault.service';
import { ZProfilesController } from './profile/profiles.controller';
import { ZTokensController } from './tokens/tokens.controller';
import { ZTokensService } from './tokens/tokens.service';

@Module({
  providers: [ZTokensService, ZUsersService, ZVaultService, { provide: DatabaseToken, useValue: ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().database(DatabaseName).host('database.zthunworks.com').port(27017).build()) }],
  controllers: [ZUsersController, ZTokensController, ZProfilesController]
})
export class ZAuthModule {}
