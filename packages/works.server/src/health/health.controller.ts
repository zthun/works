import { Controller, Get } from '@nestjs/common';

@Controller('health')
/**
 * Represents a controller for determining the health of the service.
 */
export class ZHealthController {
  /**
   * Returns a promise that resolves to true.
   */
  @Get()
  public read(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
