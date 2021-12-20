import { Module } from '@nestjs/common';
import { ZHealthModule } from '../health/health.module';
import { ZSecurityModule } from '../security/security.module';

@Module({
  imports: [ZSecurityModule, ZHealthModule],
  exports: [ZSecurityModule, ZHealthModule]
})
/**
 * Represents a composite module that joins all modules for a works application.
 */
export class ZNestApplicationModule {}
