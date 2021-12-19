/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/works.dal';
import { env } from 'process';
import { ZVaultDatabase } from './vault.database';
import { ZVaultService } from './vault.service';

/**
 * Represents the entrypoint module for this microservice.
 */
@Module({
  providers: [
    {
      provide: ZVaultDatabase.Token,
      useValue: ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().database(ZVaultDatabase.Name).url(env.DATABASE_URL).build())
    }
  ],
  controllers: [ZVaultService]
})
class ZMicroserviceModule {}

NestFactory.createMicroservice<MicroserviceOptions>(ZMicroserviceModule, { options: { host: '0.0.0.0', port: 4000 } }).then((app) => app.listen());
