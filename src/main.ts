import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZDatabaseMemory } from '@zthun/dal';
import { TokensController } from './tokens/tokens.controller';
import { TokensService } from './tokens/tokens.service';
import { ZUsersController } from './users/users.controller';

@Module({
  controllers: [
    ZUsersController,
    TokensController
  ],
  providers: [
    TokensService,
    { provide: 'AuthDatabase', useValue: ZDatabaseMemory.connect('auth') }
  ]
})
export class MainModule {
  public static async run() {
    const app = await NestFactory.create(MainModule);
    await app.listen(3000);
  }
}

MainModule.run();
