import { Module } from '@nestjs/common';
import { ZHealthModule, ZNestApplication } from '@zthun/works.nest';

@Module({
  imports: [ZHealthModule]
})
/**
 * The main module.
 */
export class ZMainModule {}

ZNestApplication.create(ZMainModule).then((app) => ZNestApplication.run(app));
