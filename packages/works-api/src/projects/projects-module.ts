import { Module } from '@nestjs/common';
import { ZVaultModule } from '@zthun/vault-client';
import { ZProjectsController } from './projects-controller';
import { ZApplicationsService, ZApplicationsToken } from './projects-service';

@Module({
  imports: [ZVaultModule],
  controllers: [ZProjectsController],
  providers: [{ provide: ZApplicationsToken, useClass: ZApplicationsService }]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZApplicationsModule {}
