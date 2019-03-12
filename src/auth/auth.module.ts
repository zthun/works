import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ZDatabaseMemory } from '@zthun/dal';
import { json, urlencoded } from 'body-parser';
import { TokensController } from '../tokens/tokens.controller';
import { TokensService } from '../tokens/tokens.service';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Module({
  controllers: [
    UsersController,
    TokensController
  ],
  providers: [
    AuthService,
    UsersService,
    TokensService,
    { provide: 'AuthDatabase', useValue: ZDatabaseMemory.connect('auth') }
  ]
})
export class AuthModule { }
