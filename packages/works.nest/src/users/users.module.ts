/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/works.dal';
import { env } from 'process';
import { ZUsersDatabase } from './users.database';
import { ZUsersService } from './users.service';

const DATABASE_USERS_PROTOCOL = env.DATABASE_USERS_PROTOCOL || env.DATABASE_PROTOCOL || null;
const DATABASE_USERS_HOST = env.DATABASE_USERS_HOST || env.DATABASE_HOST || 'users.database.zthunworks.com';
const DATABASE_USERS_PORT = +env.DATABASE_USERS_PORT || +env.DATABASE_PORT || 27017;
const DATABASE_USERS_USER = env.DATABASE_USERS_USER || env.DATABASE_USER || null;
const DATABASE_USERS_PASSWORD = env.DATABASE_USERS_PASSWORD || env.DATABASE_PASSWORD || null;
const DATABASE_OPTIONS = new ZDatabaseOptionsBuilder().database(ZUsersDatabase.Name).host(DATABASE_USERS_HOST).port(DATABASE_USERS_PORT).credentials(DATABASE_USERS_USER, DATABASE_USERS_PASSWORD).protocol(DATABASE_USERS_PROTOCOL).build();

@Module({
  providers: [ZUsersService, { provide: ZUsersDatabase.Token, useValue: ZDatabaseMongo.connect(DATABASE_OPTIONS) }],
  exports: [ZUsersService]
})
export class ZUsersModule {}
