/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/works.dal';
import { env } from 'process';
import { ZUsersDatabase } from './users.database';
import { ZUsersService } from './users.service';

/**
 * Represents the entry point module for this microservice.
 */
@Module({
  providers: [
    {
      provide: ZUsersDatabase.Token,
      useValue: ZDatabaseMongo.connect(
        new ZDatabaseOptionsBuilder()
          .database(ZUsersDatabase.Name)
          .url(env.DATABASE_URL || 'database.zthunworks.com')
          .build()
      )
    }
  ],
  controllers: [ZUsersService]
})
class ZMicroserviceModule {}

NestFactory.createMicroservice<MicroserviceOptions>(ZMicroserviceModule, {
  options: { host: '0.0.0.0', port: 4000 }
}).then((app) => app.listen());
