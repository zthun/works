import { Module } from '@nestjs/common';
import { ZAppsModule } from '@zthun/works.microservices';
import { ZConfigModule } from '../config/config.module';
import { ZApplicationsController } from './applications.controller';

@Module({
  imports: [ZConfigModule, ZAppsModule],
  controllers: [ZApplicationsController]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZApplicationsModule {}
