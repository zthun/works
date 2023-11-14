import { Module } from '@nestjs/common';
import { ZApplicationsModule } from '../applications/applications.module';
import { ZConfigModule } from '../config/config.module';
import { ZSecurityModule } from '../security/security.module';

@Module({
  imports: [ZSecurityModule, ZApplicationsModule, ZConfigModule],
  exports: [ZSecurityModule, ZApplicationsModule, ZConfigModule]
})
/**
 * Represents a composite module that joins all modules for a works application.
 */
export class ZNestApplicationModule {}
