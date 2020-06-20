import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ZRuleBodyRequiresCredentials } from '../rules/rule-body-requires-credentials.guard';
import { ZRuleCookieRequiresAuth } from '../rules/rule-cookie-requires-auth.guard';
import { ZTokensLoginDto } from './tokens-login.dto';
import { ZTokensService } from './tokens.service';

/**
 * The controller for logging the user in and out.
 */
@Controller('tokens')
export class ZTokensController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _tokens The jwt tokens client proxy.
   */
  public constructor(private readonly _jwt: ZTokensService) {}

  /**
   * Convinence method for UIs that want route guards for token auth.
   *
   * Returns a status of 204 if your cookie token is valid, and 401 if not authenticated.
   *
   * @returns A Promise that resolves to a status of 204 if the cookie token is valid, and 401 if it is not authenticated.
   */
  @Get()
  @UseGuards(ZRuleCookieRequiresAuth)
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
  @UseGuards(ZRuleBodyRequiresCredentials)
  public async login(@Res() res: Response, @Body() credentials: ZTokensLoginDto) {
    await this._jwt.inject(res, credentials);
    res.sendStatus(204);
  }

  /**
   * Removes the cookie data.
   */
  @Delete()
  @UseGuards(ZRuleCookieRequiresAuth)
  public async logout(@Res() res: Response) {
    await this._jwt.clear(res);
    res.sendStatus(204);
  }
}
