/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZCookiesModule, ZUsersModule } from '@zthun/works.microservices';
import { ZConfigModule } from '../config/config.module';
import { ZSecurityController } from './security.controller';
import { ZSecurityService } from './security.service';

@Module({
  imports: [ZConfigModule, ZUsersModule, ZCookiesModule],
  controllers: [ZSecurityController],
  providers: [ZSecurityService],
  exports: [ZSecurityService]
})
/**
 * Represents a module that includes all services to extract the cookie token.
 */
export class ZSecurityModule {}
