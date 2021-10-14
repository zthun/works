import { Module } from '@nestjs/common';
import { ZHttpService } from '@zthun/works.http';

export const ZHttpServiceToken = 'zthunworks.services.http';
export const ZHttpServiceProvider = { provide: ZHttpServiceToken, useClass: ZHttpService };

@Module({
  providers: [ZHttpServiceProvider, ZHttpService],
  exports: [ZHttpServiceProvider, ZHttpService]
})
/**
 * Represents a module that provides http services.
 */
export class ZHttpModule {}
