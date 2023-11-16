import { Module } from '@nestjs/common';
import { ZVaultModule } from '@zthun/vault-client';
import { ZApplicationsService, ZApplicationsToken } from './application-service';
import { ZApplicationsController } from './applications-controller';

@Module({
  imports: [ZVaultModule],
  controllers: [ZApplicationsController],
  providers: [{ provide: ZApplicationsToken, useClass: ZApplicationsService }]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZApplicationsModule {}
