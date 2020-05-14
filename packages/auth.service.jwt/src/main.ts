#!/usr/bin/env node

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ZTokensRepositoryController } from './tokens/tokens-repository.controller';

@Module({
  controllers: [ZTokensRepositoryController]
})
export class ZMainModule {
  public static async run() {
    const app = await NestFactory.createMicroservice(ZMainModule, { transport: Transport.TCP, options: { host: '0.0.0.0', port: 3000 } });
    await app.listenAsync();
  }
}

ZMainModule.run();
