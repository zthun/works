import { Module, OnModuleInit } from '@nestjs/common';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { DatabaseToken } from '../common/injection.constants';
import { ZCrudService } from '../crud/crud.service';
import { ZGroupsController } from '../groups/groups.controller';
import { ZHealthController } from '../health/health.controller';
import { ZOauthPasswordService } from '../oauth/oauth-password.service';
import { ZOauthServerService } from '../oauth/oauth-server.service';
import { ZPermissionsController } from '../permissions/permissions.controller';
import { ZTokensController } from '../tokens/tokens.controller';
import { ZUsersController } from '../users/users.controller';
import { ZAuthService } from './auth.service';

@Module({
  controllers: [
    ZUsersController,
    ZTokensController,
    ZPermissionsController,
    ZGroupsController,
    ZHealthController
  ],
  providers: [
    {
      provide: DatabaseToken,
      useValue: ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().database('auth').host('database.auth.zthunworks.com').port(27017).build())
    },
    ZOauthPasswordService,
    ZOauthServerService,
    ZCrudService,
    ZAuthService
  ]
})
export class ZAuthModule implements OnModuleInit {
  public constructor(private readonly _auth: ZAuthService) { }

  public async onModuleInit() {
    await this._auth.setupSystemPermissions();
    await this._auth.setupSystemGroups();
  }
}
