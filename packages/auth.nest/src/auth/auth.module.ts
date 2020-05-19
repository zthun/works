import { Module } from '@nestjs/common';
import { DomainToken } from '../common/injection.constants';
import { ZJwtService } from '../tokens/jwt.service';
import { ZTokensController } from '../tokens/tokens.controller';
import { ZUsersController } from '../users/users.controller';
import { ZUsersService } from '../users/users.service';

@Module({
  providers: [ZJwtService, ZUsersService, { provide: DomainToken, useValue: 'zthunworks.com' }],
  controllers: [ZUsersController, ZTokensController]
})
export class ZAuthModule {}
