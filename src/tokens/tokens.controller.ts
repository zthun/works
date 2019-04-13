import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Req, UnauthorizedException, UnsupportedMediaTypeException } from '@nestjs/common';
import { IZDatabase } from '@zthun/dal';
import { Request } from 'express';
import * as OAuth2Server from 'oauth2-server';
import { Collections } from '../common/collections.enum';
import { zsha256 } from '../common/hash.function';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken, OAuthModelToken } from '../common/injection.constants';
import { OAuthModel } from '../oauth/oauth-modal.type';
import { ZOAuthParamsBuilder } from '../oauth/oauth-params-builder.class';
import { IZLogin } from '../users/login.interface';
import { IZUser } from '../users/user.interface';
import { ZTokenBuilder } from './token-builder.class';
import { IZToken } from './token.interface';

@Controller('tokens')
export class TokensController {
  private _oauth: OAuth2Server;

  public constructor(@Inject(OAuthModelToken) private readonly _model: OAuthModel, @Inject(DatabaseToken) private readonly _dal: IZDatabase) {
    this._oauth = new OAuth2Server({ model: _model });
  }

  @Get(':token')
  public async get(@Param() params: any): Promise<IZToken> {
    // const token = params.token.startsWith('Bearer') ? params.token : `Bearer ${params.token}`;
    // const t = await this._service.authenticate(token);
    /*
        try {
      const req = new OAuth2Server.Request(request);
      const res = new OAuth2Server.Response();
      const token = await this._oauth.authenticate(req, res);
      return token;
    } catch (err) {
      const serr = err as OAuth2Server.ServerError;
      throw new UnauthorizedException(serr.message);
    }*/
    return Promise.resolve(null);
  }

  /**
   * Creates a new token.
   *
   * @param token The token body.
   * @param request The request to forward to the oauth server.
   *
   * @return A promise that, when resolved, has created the token.
   */
  @Post()
  public async create(@Body() login: IZLogin, @Req() request: Request): Promise<IZToken> {
    // Validate caller input
    ZHttpAssert.assert(request.headers['content-type'] === 'application/x-www-form-urlencoded', () => new UnsupportedMediaTypeException('A token request only supports x-www-form-urlencoded content'));
    ZHttpAssert.assert(!!login.email, () => new BadRequestException('Field, email, is required.'));
    ZHttpAssert.assert(!!login.password, () => new BadRequestException('Field, password, is required when creating tokens.'));

    // Validate the user exists.
    const userFilter: Partial<IZUser> = { email: login.email };
    const userBlobs = await this._dal.read<IZUser>(Collections.Users).filter(userFilter).run();
    ZHttpAssert.assert(userBlobs.length > 0, () => new UnauthorizedException('The email or password is incorrect.'));

    // Validate the user password
    const user = userBlobs[0];
    const hash = zsha256(login.password, user.salt);
    ZHttpAssert.assert(user.password === hash, () => new UnauthorizedException('The email or password is incorrect.'));

    // Create the token
    request.body = new ZOAuthParamsBuilder().username(login.email).password(login.password).params();
    const req = new OAuth2Server.Request(request);
    const res = new OAuth2Server.Response();
    const oauthToken = await this._oauth.token(req, res);
    return new ZTokenBuilder().copyOauth(oauthToken).redact().token();
  }
}
