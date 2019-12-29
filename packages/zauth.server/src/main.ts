#!/usr/bin/env node

import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZAuthModule } from './auth/auth.module';
import { ZExceptionFactory } from './validation/exception-factory.class';

@Module({
  imports: [ZAuthModule]
})
export class ZMainModule {
  public static async run() {
    const app = await NestFactory.create(ZMainModule);
    app.useGlobalPipes(new ValidationPipe({ exceptionFactory: ZExceptionFactory.messageOnly }));
    await app.listen(3000);
  }
}

ZMainModule.run();
