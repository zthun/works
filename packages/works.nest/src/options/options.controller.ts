import { Controller, Get, Req } from '@nestjs/common';
import { Request, Router } from 'express';

@Controller('options')
/**
 * Represents a controller for determining the health of the service.
 */
export class ZOptionsController {
  /**
   * Returns a promise that resolves all the available routes for the entire server.
   *
   * @param req The request.
   *
   * @returns A promise that resolves the api options.
   */
  @Get()
  public async read(@Req() req: Request): Promise<{ path: string; method: string }[]> {
    const router = req.app._router as Router;
    const routes = router.stack.filter((r) => !!r.route).map((r) => r.route);

    const result: { path: string; method: string }[] = [];

    routes.forEach((route) => {
      route.stack.forEach((stack: { method: any }) => {
        const path = route.path;
        const method = stack.method;
        result.push({ path, method });
      });
    });

    return result;
  }
}
