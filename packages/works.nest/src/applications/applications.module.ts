import { Module } from '@nestjs/common';
import { ZVaultModule } from '@zthun/vault-client';
import { ZAppsModule } from '@zthun/works.microservices';
import { ZApplicationsController } from './applications.controller';

@Module({
  imports: [ZVaultModule, ZAppsModule],
  controllers: [ZApplicationsController]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZApplicationsModule {}
