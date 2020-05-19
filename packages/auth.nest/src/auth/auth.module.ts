import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DomainToken, UserServiceToken } from '../common/injection.constants';
import { ZJwtService } from '../tokens/jwt.service';
import { ZTokensController } from '../tokens/tokens.controller';
import { ZUsersController } from '../users/users.controller';

@Module({
  imports: [ClientsModule.register([{ name: UserServiceToken, transport: Transport.TCP, options: { host: 'user.service.auth.zthunworks.com', port: 3000 } }])],
  providers: [ZJwtService, { provide: DomainToken, useValue: 'zthunworks.com' }],
  controllers: [ZUsersController, ZTokensController]
})
export class ZAuthModule {}
