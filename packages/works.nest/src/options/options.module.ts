/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZOptionsController } from './options.controller';

@Module({
  controllers: [ZOptionsController]
})
/**
 * Represents a module that includes all services to make the options check.
 */
export class ZOptionsModule {}
