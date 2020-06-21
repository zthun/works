/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { env } from 'process';
import { ZUsersDatabase } from './users.database';
import { ZUsersService } from './users.service';

const DATABASE_USERS_HOST = env.DATABASE_USERS_HOST || 'users.database.zthunworks.com';
const DATABASE_USERS_PORT = +env.DATABASE_USERS_PORT || 27017;

@Module({
  providers: [ZUsersService, { provide: ZUsersDatabase.Token, useValue: ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().database(ZUsersDatabase.Name).host(DATABASE_USERS_HOST).port(DATABASE_USERS_PORT).build()) }],
  exports: [ZUsersService]
})
export class ZUsersModule {}
