/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ZVaultModule } from '@zthun/works.microservices';
import { ZWorksConfigService } from './works-config.service';

@Module({
  imports: [ZVaultModule],
  providers: [ZWorksConfigService],
  exports: [ZWorksConfigService]
})
/**
 * Represents a module for handling basic zthunworks configurations.
 *
 * This is a wrapper around the vault module which will allow you to retrieve specific
 * common config values without having to know their scopes and keys.
 */
export class ZConfigModule {}
