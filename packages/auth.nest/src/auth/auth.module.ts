import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UserServiceToken } from '../common/injection.constants';
import { ZHealthController } from '../health/health.controller';
import { ZUsersController } from '../users/users.controller';

@Module({
  imports: [ClientsModule.register([{ name: UserServiceToken }])],
  controllers: [ZUsersController, ZHealthController]
})
export class ZAuthModule {}
