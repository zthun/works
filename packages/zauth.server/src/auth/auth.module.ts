import { Module } from '@nestjs/common';
import { ZDatabaseMongo } from '@zthun/dal';
import { DatabaseToken } from '../common/injection.constants';
import { ZHealthController } from '../health/health.controller';
import { ZOauthPasswordService } from '../oauth/oauth-password.service';
import { ZOauthServerService } from '../oauth/oauth-server.service';
import { ZPermissionsController } from '../permissions/permissions.controller';
import { ZTokensController } from '../tokens/tokens.controller';
import { ZUsersController } from '../users/users.controller';

@Module({
  controllers: [
    ZUsersController,
    ZTokensController,
    ZPermissionsController,
    ZHealthController
  ],
  providers: [
    { provide: DatabaseToken, useValue: ZDatabaseMongo.connect('auth', 'database.auth.zthunworks.com', 27017) },
    ZOauthPasswordService,
    ZOauthServerService,
  ]
})
export class ZAuthModule { }
