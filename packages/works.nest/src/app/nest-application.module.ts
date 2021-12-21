import { Module } from '@nestjs/common';
import { ZAppsModule } from '../apps/apps.module';
import { ZHealthModule } from '../health/health.module';
import { ZSecurityModule } from '../security/security.module';

@Module({
  imports: [ZSecurityModule, ZHealthModule, ZAppsModule],
  exports: [ZSecurityModule, ZHealthModule, ZAppsModule]
})
/**
 * Represents a composite module that joins all modules for a works application.
 */
export class ZNestApplicationModule {}
