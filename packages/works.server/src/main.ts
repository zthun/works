import { Module } from '@nestjs/common';
import { ZAuthModule, ZNestApplication, ZNestApplicationModule } from '@zthun/works.nest';

@Module({
  imports: [ZAuthModule, ZNestApplicationModule]
})
/**
 * The main module.
 */
export class ZMainModule {}

ZNestApplication.create(ZMainModule).then((app) => ZNestApplication.run(app));
