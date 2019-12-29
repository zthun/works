#!/usr/bin/env node

import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZAuthModule } from './auth/auth.module';

@Module({
  imports: [ZAuthModule]
})
export class ZMainModule {
  public static async run() {
    const app = await NestFactory.create(ZMainModule);
    app.useGlobalPipes(new ValidationPipe({ validationError: { value: false, target: false } }));
    await app.listen(3000);
  }
}

ZMainModule.run();
