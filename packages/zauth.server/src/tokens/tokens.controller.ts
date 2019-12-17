import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, NotImplementedException, Param, Post, Put, Req, Res } from '@nestjs/common';
import { IZLogin, IZToken, IZUser, ZTokenBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { Request as ERequest, Response as EResponse } from 'express';
import OAuth2Server, { Request, Response } from 'oauth2-server';
import { v4 } from 'uuid';
import { Collections } from '../common/collections.enum';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';
import { ZTokensPasswordModel } from './password-model.class';

@Controller('tokens')
export class ZTokensController {
  private _server: OAuth2Server;

  /**
   * Initializes a new instance of this object.
   *
   * @param _oauth: The oauth service.
   * @param _dal The data access layer.
   */
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) {
    this._server = new OAuth2Server({ model: new ZTokensPasswordModel(_dal) });
  }

  /**
   * Gets all of the access tokens that are currently available to the current user.
   *
   * @returns A promise that, when resolved, has a list of tokens available to the user.  If no
   *          user is currently logged in, then this method results in a 401 error.
   */
  @Get()
  public async list(): Promise<IZToken> {
    throw new NotImplementedException();
  }

  /**
   * Retrieves a token by it's identifier.
   *
   * @param params The parameters that contain the token id to retrieve.
   *
   * @returns A promise that, when resolved has found a NON EXPIRED token.  An expired token,
   *          a non existant token, or a token that doesn't belong to the user will result in a 401.
   */
  @Get(':id')
  public async read(@Param() params: { id: string }): Promise<IZToken> {
    throw new NotImplementedException();
  }

  /**
   * Creates a new login token.
   *
   * This is basically a login.
   *
   * @returns A promise that, when resolved, has the users token. If the
   *          login is not valid, then the promise is rejected with a 401
   *          error.
   */
  @Post()
  public async create(@Body() login: IZLogin, @Req() req: ERequest): Promise<IZToken> {
    ZHttpAssert.assert(!!login.email, () => new BadRequestException('User email is required.'));
    ZHttpAssert.assert(!!login.password, () => new BadRequestException('Password is required.'));

    // Since this only accepts the password flow and we're basically building a distributed system that is
    // meant to integrate, we don't actually need a client and secret, thus, just give a throwaway client.
    // We're also going to just trick the body to allow json.
    const oreq = new Request(req);
    oreq.headers['content-type'] = 'application/x-www-form-urlencoded';
    oreq.body.username = login.email;
    oreq.body.client_id = v4();
    oreq.body.client_secret = v4();
    oreq.body.grant_type = 'password';
    const tokenp = this._server.token(oreq, new Response());
    const token = await tokenp;
    await this._dal.update<IZUser>(Collections.Users, { login: Date.now() }).filter({ _id: token.userId }).run();
    return new ZTokenBuilder().token(token.accessToken).expire(token.accessTokenExpiresAt).user(token.user._id).redact().build();
  }

  /**
   * Refreshes the login token.
   *
   * This is the same as a token heartbeat to refresh it.
   *
   * @param login The login to reactivate.
   *
   * @returns A promise that, when resolved, has updated the tokens
   *          expire time.  If the token has expired or does not exist,
   *          or the credentials do not match, then the promise is rejected
   *          with a 401 error.
   */
  @Put()
  public async update(@Body() login: IZLogin): Promise<IZToken> {
    throw new NotImplementedException();
  }

  /**
   * Removes the access token.
   *
   * This is the same as logout.
   *
   * @param params The parameters that contain the id to remove.
   */
  @Delete(':id')
  public async remove(@Param() params: { id: string }): Promise<IZToken> {
    const blobs = await this._dal.read<IZUser>(Collections.Users).filter({ _id: params.id }).run();
    ZHttpAssert.assert(blobs.length > 0, () => new NotFoundException('Unable to log out a user that does not exist.'));
    const user = blobs[0];

    await this._dal.update(Collections.Users, { logout: Date.now() }).filter({ _id: user._id }).run();
    const updated = await this._dal.read<IZUser>(Collections.Users).filter({ _id: params.id }).run();
    return null;
  }
}
