#!/usr/bin/env node

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZDatabaseMongo } from '@zthun/dal';
import { DatabaseToken } from './common/injection.constants';
import { ZHealthController } from './health/health.controller';
import { ZTokensController } from './tokens/tokens.controller';
import { ZUsersController } from './users/users.controller';

@Module({
  controllers: [
    ZUsersController,
    ZTokensController,
    ZHealthController
  ],
  providers: [
    { provide: DatabaseToken, useValue: ZDatabaseMongo.connect('auth', 'database.auth.zthunworks.com', 27017) },
  ]
})
export class MainModule {
  public static async run() {
    const app = await NestFactory.create(MainModule);
    await app.listen(3000);
  }
}

MainModule.run();
