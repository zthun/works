import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DomainToken, JwtServiceToken, UserServiceToken } from '../common/injection.constants';
import { ZTokensController } from '../tokens/tokens.controller';
import { ZUsersController } from '../users/users.controller';

@Module({
  imports: [
    ClientsModule.register([
      { name: UserServiceToken, transport: Transport.TCP, options: { host: 'user.service.auth.zthunworks.com', port: 3000 } },
      { name: JwtServiceToken, transport: Transport.TCP, options: { host: 'jwt.service.auth.zthunworks.com', port: 3000 } }
    ])
  ],
  providers: [{ provide: DomainToken, useValue: 'zthunworks.com' }],
  controllers: [ZUsersController, ZTokensController]
})
export class ZAuthModule {}
