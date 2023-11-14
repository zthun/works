import { Module } from '@nestjs/common';
import { ZApplicationsModule } from '../applications/applications.module';
import { ZConfigModule } from '../config/config.module';

@Module({
  imports: [ZApplicationsModule, ZConfigModule],
  exports: [ZApplicationsModule, ZConfigModule]
})
/**
 * Represents a composite module that joins all modules for a works application.
 */
export class ZNestApplicationModule {}
