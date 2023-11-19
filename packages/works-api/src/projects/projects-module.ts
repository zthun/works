import { Module } from '@nestjs/common';
import { ZVaultModule } from '@zthun/vault-client';
import { ZProjectsController } from './projects-controller';
import { ZProjectsService, ZProjectsToken } from './projects-service';

@Module({
  imports: [ZVaultModule],
  controllers: [ZProjectsController],
  providers: [{ provide: ZProjectsToken, useClass: ZProjectsService }]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZProjectsModule {}
