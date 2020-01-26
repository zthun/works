import { Body, Controller, Delete, Get, NotImplementedException, Post, Put, Res, UseGuards } from '@nestjs/common';
import { IZToken, ZTokenBuilder } from '@zthun/auth.core';
import { Response } from 'express';
import { ZOauthServerService } from '../oauth/oauth-server.service';
import { ZTokenCreateDto } from './token-create.dto.class';
import { ZTokensGuard } from './tokens.guard';

@Controller('tokens')
export class ZTokensController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _oauth: The oauth service.
   */
  public constructor(private readonly _oauth: ZOauthServerService) { }

  /**
   * Creates a new token.
   *
   * This is basically a login.
   *
   * @returns A promise that, when resolved, has the users token. If the
   *          login is not valid, then the promise is rejected with a 401
   *          error.
   */
  @Post()
  public async create(@Body() login: ZTokenCreateDto, @Res() res: Response): Promise<IZToken> {
    const token = await this._oauth.create(login.email, login.password);
    res.cookie('Authorization', `Bearer ${token.accessToken}`, { expires: token.accessTokenExpiresAt, secure: true, httpOnly: true });
    return new ZTokenBuilder().token(token.accessToken).expire(token.accessTokenExpiresAt).user(token.user._id).redact().build();
  }

  /**
   * Refreshes the current token expiration date.
   *
   * This is the same as a token heartbeat to refresh it
   *
   * @returns A promise that, when resolved, has updated the tokens
   *          expire time.  If the token has expired or does not exist,
   *          or the credentials do not match, then the promise is rejected
   *          with a 401 error.
   */
  @Put()
  @UseGuards(ZTokensGuard)
  public update(): Promise<IZToken> {
    throw new NotImplementedException();
  }

  /**
   * Removes the access token.
   *
   * This is the same as logout.
   */
  @Delete()
  @UseGuards(ZTokensGuard)
  public remove(): Promise<IZToken> {
    throw new NotImplementedException();
  }
}
