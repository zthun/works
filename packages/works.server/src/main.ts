#!/usr/bin/env node

import { Module } from '@nestjs/common';
import { ZAuthModule, ZHealthModule, ZNestApplication } from '@zthun/works.nest';

@Module({
  imports: [ZAuthModule, ZHealthModule]
})
/**
 * The main module.
 */
export class ZMainModule {}

ZNestApplication.create(ZMainModule).then((app) => ZNestApplication.run(app));
