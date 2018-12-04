import { Module } from '@nestjs/common';
import { TokensController } from '../tokens/tokens.controller';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { DataAccessService } from './data-access.service.class';

@Module({
  controllers: [
    UsersController,
    TokensController
  ],
  providers: [
    DataAccessService,
    AuthService,
    UsersService
  ]
})
export class AuthModule { }
