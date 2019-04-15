import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZDatabaseMemory } from '@zthun/dal';
import { DatabaseToken } from './common/injection.constants';
import { ZHealthController } from './health/health.controller';
import { ZLoginsController } from './logins/logins.controller';
import { ZUsersController } from './users/users.controller';

@Module({
  controllers: [
    ZUsersController,
    ZLoginsController,
    ZHealthController
  ],
  providers: [
    { provide: DatabaseToken, useValue: ZDatabaseMemory.connect('auth') },
  ]
})
export class MainModule {
  public static async run() {
    const app = await NestFactory.create(MainModule);
    await app.listen(3000);
  }
}

MainModule.run();
