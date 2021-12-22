import { Module } from '@nestjs/common';
import { ZApplicationsModule } from '../applications/applications.module';
import { ZConfigModule } from '../config/config.module';
import { ZHealthModule } from '../health/health.module';
import { ZSecurityModule } from '../security/security.module';

@Module({
  imports: [ZSecurityModule, ZHealthModule, ZApplicationsModule, ZConfigModule],
  exports: [ZSecurityModule, ZHealthModule, ZApplicationsModule, ZConfigModule]
})
/**
 * Represents a composite module that joins all modules for a works application.
 */
export class ZNestApplicationModule {}
