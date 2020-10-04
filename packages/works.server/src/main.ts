#!/usr/bin/env node

import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZAuthModule, ZExceptionFactory } from '@zthun/works.nest';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { json } from 'express';
import { ZHealthController } from './health/health.controller';

@Module({
  imports: [ZAuthModule],
  controllers: [ZHealthController]
})
export class ZMainModule {
  public static async run() {
    const app = await NestFactory.create(ZMainModule);
    app.use(helmet());
    app.use(json({ limit: '500kb' }));
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, exceptionFactory: ZExceptionFactory.messageOnly }));
    await app.listen(3000);
  }
}

ZMainModule.run();
