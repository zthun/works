#!/usr/bin/env node

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { noop } from 'lodash';
import { DatabaseToken } from './common/injection.constants';

@Module({
  providers: [
    {
      provide: DatabaseToken,
      useValue: ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().database('auth').host('database.auth.zthunworks.com').port(27017).build())
    }
  ]
})
export class ZMainModule {
  public static async run() {
    const app = await NestFactory.createMicroservice(ZMainModule);
    await app.listen(noop);
  }
}

ZMainModule.run();
