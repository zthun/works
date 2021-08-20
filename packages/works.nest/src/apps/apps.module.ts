import { Module } from '@nestjs/common';
import { ZVaultModule } from '../vault/vault.module';
import { ZAppsService } from './apps.service';
import { ZWebAppsController } from './web-apps/web-apps.controller';

@Module({
  providers: [ZAppsService],
  imports: [ZVaultModule],
  controllers: [ZWebAppsController],
  exports: [ZAppsService]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZAppsModule {}
