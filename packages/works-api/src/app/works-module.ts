import { Module } from '@nestjs/common';
import { ZProjectsModule } from '../projects/projects-module';

@Module({
  imports: [ZProjectsModule]
})
export class ZWorksModule {}
