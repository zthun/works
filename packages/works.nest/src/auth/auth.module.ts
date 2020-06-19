import { Module } from '@nestjs/common';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { DatabaseName } from '../common/collections.enum';
import { DatabaseToken } from '../common/injection.constants';
import { ZConfigsService } from '../config/configs.service';
import { ZJwtService } from '../tokens/jwt.service';
import { ZTokensController } from '../tokens/tokens.controller';
import { ZProfilesController } from '../users/profiles.controller';
import { ZUsersController } from '../users/users.controller';
import { ZUsersService } from '../users/users.service';

@Module({
  providers: [ZJwtService, ZUsersService, ZConfigsService, { provide: DatabaseToken, useValue: ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().database(DatabaseName).host('database.zthunworks.com').port(27017).build()) }],
  controllers: [ZUsersController, ZTokensController, ZProfilesController]
})
export class ZAuthModule {}
