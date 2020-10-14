/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZHealthController } from './health.controller';

@Module({
  controllers: [ZHealthController]
})
/**
 * Represents a module that includes all services to make the health check.
 */
export class ZHealthModule {}
