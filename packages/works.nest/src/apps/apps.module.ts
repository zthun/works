import { Module } from '@nestjs/common';
import { ZVaultModule } from '@zthun/works.microservices';
import { ZConfigModule } from '../config/config.module';
import { ZAppsService } from './apps.service';
import { ZWebAppsController } from './web-apps/web-apps.controller';

@Module({
  providers: [ZAppsService],
  imports: [ZVaultModule, ZConfigModule],
  controllers: [ZWebAppsController],
  exports: [ZAppsService]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZAppsModule {}
