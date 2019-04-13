import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class ZHealthController {
  @Get()
  public read(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
