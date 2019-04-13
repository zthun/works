import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZDatabaseMemory } from '@zthun/dal';
import { DatabaseToken, OAuthModelToken } from './common/injection.constants';
import { ZHealthController } from './health/health.controller';
import { ZPasswordModel } from './oauth/password-model.class';
import { TokensController } from './tokens/tokens.controller';
import { ZUsersController } from './users/users.controller';

@Module({
  controllers: [
    ZUsersController,
    TokensController,
    ZHealthController
  ],
  providers: [
    { provide: DatabaseToken, useValue: ZDatabaseMemory.connect('auth') },
    { provide: OAuthModelToken, useClass: ZPasswordModel }
  ]
})
export class MainModule {
  public static async run() {
    const app = await NestFactory.create(MainModule);
    await app.listen(3000);
  }
}

MainModule.run();
