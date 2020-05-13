#!/usr/bin/env node

import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZAuthModule, ZExceptionFactory } from '@zthun/auth.nest';

@Module({
  imports: [ZAuthModule]
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
