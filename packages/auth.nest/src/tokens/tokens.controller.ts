import { Body, Controller, Delete, Get, Inject, Post, Res, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ZLoginBuilder } from '@zthun/auth.core';
import { Response } from 'express';
import { v4 } from 'uuid';
import { ZHttpAssert } from '../common/http-assert.class';
import { DomainToken, JwtServiceToken, UserServiceToken } from '../common/injection.constants';
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
  public constructor(@Inject(DomainToken) private readonly _domain: string, @Inject(UserServiceToken) private readonly _users: ClientProxy, @Inject(JwtServiceToken) private readonly _tokens: ClientProxy) {}

  /**
   * Convinence method for UIs that want route guards for token auth.
   *
   * Returns a status of 204 if your cookie token is valid, and 401 if not authenticated.
   *
   * @returns A Promise that resolves to a status of 20 if the cookie token is valid, and 401 if it is not authenticated.
   */
  @Get()
  // @UseGuards(ZRequiresUser)
  public async verify(@Res() res: Response) {
    res.sendStatus(204);
    return null;
  }

  /**
   * Logs the user into the system.
   *
   * @param credentials The user credentials.
   *
   * @returns A promise that resolves to a status of 204 if the cookie token is valid, and 401 if the user cannot login.  The return will
   */
  @Post()
  public async login(@Res() res: Response, @Body() credentials: ZTokensLoginDto) {
    const valid = await this._users.send('compare', new ZLoginBuilder().copy(credentials).build()).toPromise();
    ZHttpAssert.assert(valid, () => new UnauthorizedException('Your credentials are incorrect.  Please try again.'));
    // const jwt = this._jwt.sign();
    const jwt = v4();
    const tomorrow = new Date(Date.now() + 3600000);
    res.cookie('Authentication', jwt, { secure: true, httpOnly: true, expires: tomorrow, domain: this._domain });
    res.sendStatus(204);
    return null;
  }

  /**
   * Removes the cookie data.
   */
  @Delete()
  // @UseGuards(ZRequiresUser)
  public async logout(@Res() res: Response) {
    res.clearCookie('Authentication');
    res.sendStatus(204);
    return null;
  }
}
