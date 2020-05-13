#!/usr/bin/env node

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { DatabaseToken } from './common/injection.constants';
import { ZUsersController } from './users/users.controller';

@Module({
  controllers: [ZUsersController],
  providers: [
    {
      provide: DatabaseToken,
      useValue: ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().database('auth').host('database.auth.zthunworks.com').port(27017).build())
    }
  ]
})
export class ZMainModule {
  public static async run() {
    const app = await NestFactory.createMicroservice(ZMainModule, { transport: Transport.TCP, options: { host: '0.0.0.0', port: 3000 } });
    await app.listenAsync();
  }
}

ZMainModule.run();
