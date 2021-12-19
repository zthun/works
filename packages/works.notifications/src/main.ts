/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ZNotificationsService } from './notifications.service';

/**
 * Represents the module that handles notifications.
 */
@Module({
  controllers: [ZNotificationsService]
})
class ZMicroserviceModule {}

NestFactory.createMicroservice<MicroserviceOptions>(ZMicroserviceModule, { options: { host: '0.0.0.0', port: 4000 } }).then((app) => app.listen());
