import { Module } from '@nestjs/common';
import { ZProjectsController } from './projects-controller';
import { ZProjectsService, ZProjectsToken } from './projects-service';

@Module({
  controllers: [ZProjectsController],
  providers: [{ provide: ZProjectsToken, useClass: ZProjectsService }]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZProjectsModule {}
