import { Body, Controller, Delete, Get, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ZAssert, ZLoginBuilder } from '@zthun/auth.core';
import { Response } from 'express';
import { ZRuleRequiresAuth } from '../rules/rule-requires-auth.guard';
import { ZUsersService } from '../users/users.service';
import { ZJwtService } from './jwt.service';
import { ZTokensLoginDto } from './tokens-login.dto';

/**
 * The controller for logging the user in and out.
 */
@Controller('tokens')
export class ZTokensController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _users The users client proxy.
   * @param _tokens The jwt tokens client proxy.
   */
  public constructor(private readonly _users: ZUsersService, private readonly _jwt: ZJwtService) {}

  /**
   * Convinence method for UIs that want route guards for token auth.
   *
   * Returns a status of 204 if your cookie token is valid, and 401 if not authenticated.
   *
   * @returns A Promise that resolves to a status of 204 if the cookie token is valid, and 401 if it is not authenticated.
   */
  @Get()
  @UseGuards(ZRuleRequiresAuth)
  public async verify(@Res() res: Response) {
    res.sendStatus(204);
  }

  /**
   * Logs the user into the system.
   *
   * @param credentials The user credentials.
   *
   * @returns A promise that resolves to a status of 204 if the cookie token is valid, and 401 if the user cannot login.
   */
  @Post()
  public async login(@Res() res: Response, @Body() credentials: ZTokensLoginDto) {
    const valid = await this._users.compare(new ZLoginBuilder().copy(credentials).build());
    ZAssert.claim(valid, 'Your credentials are incorrect.  Please try again.').assert((msg) => new UnauthorizedException(msg));
    await this._jwt.inject(res, credentials);
    res.sendStatus(204);
  }

  /**
   * Removes the cookie data.
   */
  @Delete()
  @UseGuards(ZRuleRequiresAuth)
  public async logout(@Res() res: Response) {
    await this._jwt.clear(res);
    res.sendStatus(204);
  }
}
