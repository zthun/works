import { Module } from '@nestjs/common';
import { TokensController } from '../tokens/tokens.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [
    TokensController
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }