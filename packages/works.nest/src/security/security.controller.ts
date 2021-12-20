import { Controller, Get, Req } from '@nestjs/common';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { Request } from 'express';
import { ZSecurityService } from './security.service';

@Controller('identity')
/**
 * The security controller adds the /identity route.
 *
 * The /identity route is the secure way to read the existing cookie.
 */
export class ZSecurityController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _security The security service.
   * @param _profile The profile service.
   */
  public constructor(private readonly _security: ZSecurityService) {}

  /**
   * Reads the user profile from the cookie.
   *
   * @param req The request object.
   *
   * @returns The profile object given the requested cookie.
   */
  @Get()
  public async read(@Req() req: Request): Promise<IZProfile> {
    const user = await this._security.extract(req);
    return new ZProfileBuilder().user(user).build();
  }
}
