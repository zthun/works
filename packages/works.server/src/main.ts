import { Module } from '@nestjs/common';
import { ZAuthModule, ZHealthModule, ZNestApplication, ZOptionsModule } from '@zthun/works.nest';

@Module({
  imports: [ZAuthModule, ZHealthModule, ZOptionsModule]
})
/**
 * The main module.
 */
export class ZMainModule {}

ZNestApplication.create(ZMainModule).then((app) => ZNestApplication.run(app));
