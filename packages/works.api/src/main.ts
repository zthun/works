import { Module } from '@nestjs/common';
import { ZHealthModule, ZNestApplication, ZOptionsModule } from '@zthun/works.nest';

@Module({
  imports: [ZHealthModule, ZOptionsModule]
})
/**
 * The main module.
 */
export class ZMainModule {}

ZNestApplication.create(ZMainModule).then((app) => ZNestApplication.run(app));
