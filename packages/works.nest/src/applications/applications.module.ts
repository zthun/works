import { Module } from '@nestjs/common';
import { ZAppsModule, ZVaultModule } from '@zthun/works.microservices';
import { ZApplicationsController } from './applications.controller';

@Module({
  imports: [ZVaultModule, ZAppsModule],
  controllers: [ZApplicationsController]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZApplicationsModule {}
