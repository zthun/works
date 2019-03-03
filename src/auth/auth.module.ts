import { Module } from '@nestjs/common';
import { ZDatabaseMongo } from '@zthun/dal';
import { TokensController } from '../tokens/tokens.controller';
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
    { provide: 'AuthDatabase', useValue: ZDatabaseMongo.connect('auth') }
  ]
})
export class AuthModule { }
