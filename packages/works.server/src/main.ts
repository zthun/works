import { Module } from '@nestjs/common';
import { ZAppsModule, ZAuthModule, ZHealthModule, ZNestApplication } from '@zthun/works.nest';

@Module({
  imports: [ZAuthModule, ZAppsModule, ZHealthModule]
})
/**
 * The main module.
 */
export class ZMainModule {}

ZNestApplication.create(ZMainModule).then((app) => ZNestApplication.run(app));
