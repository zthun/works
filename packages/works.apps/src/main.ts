/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ZAppsService } from './apps.service';

/**
 * Represents the entry point module for this microservice.
 */
@Module({
  controllers: [ZAppsService]
})
class ZMicroserviceModule {}

NestFactory.createMicroservice<MicroserviceOptions>(ZMicroserviceModule, {
  options: { host: '0.0.0.0', port: 4000 }
}).then((app) => app.listen());
