#!/usr/bin/env node

import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZAuthModule, ZExceptionFactory } from '@zthun/auth.nest';
import { ZHealthController } from './health/health.controller';

@Module({
  imports: [ZAuthModule],
  controllers: [ZHealthController]
})
export class ZMainModule {
  public static async run() {
    const app = await NestFactory.create(ZMainModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ exceptionFactory: ZExceptionFactory.messageOnly }));
    await app.listen(3000);
  }
}

ZMainModule.run();
