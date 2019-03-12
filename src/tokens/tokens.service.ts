import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IZDatabase } from '@zthun/dal';
import { Request as ERequest } from 'express';
import * as OAuth2Server from 'oauth2-server';
import { Callback, Client, PasswordModel, Request as ORequest, Response, Token, User } from 'oauth2-server';
import { IUserToken } from './user-token.interface';

@Injectable()
export class TokensService implements PasswordModel {
  private _oauth: OAuth2Server;

  public constructor(@Inject('AuthDatabase') private readonly _dal: IZDatabase) {
    this._oauth = new OAuth2Server({ model: this });
  }

  public async authenticate(erequest: ERequest) {
    try {
      const req = new ORequest(erequest);
      const res = new Response();
      return this._oauth.authenticate(req, res);
    } catch (err) {
      const serr = err as OAuth2Server.ServerError;
      throw new InternalServerErrorException(serr.message);
    }
  }

  public async token(erec: ERequest) {
    const req = new ORequest(erec);
    const res = new Response();
    return this._oauth.token(req, res);
  }

  public async getUser(username: string, password: string, callback?: Callback<false | '' | 0 | User>): Promise<false | '' | 0 | User> {
    const filter = { email: { $eq: username } };
    const users = await this._dal.read<any>('users').filter(filter).run();

    if (users.length === 0) {
      callback(new NotFoundException());
    }

    const user = users[0];
    callback(null, user);
    return user;
  }

  public getClient(clientId: string, clientSecret: string, callback?: Callback<false | '' | 0 | Client>): Promise<false | '' | 0 | Client> {
    const client: Client = {
      id: clientId,
      grants: ['password']
    };

    callback(null, client);
    return Promise.resolve(client);
  }

  public async saveToken(token: Token, client: Client, user: User, callback?: Callback<Token>): Promise<false | '' | 0 | Token> {
    const userToken: IUserToken = {
      _id: token.accessToken,
      expire: token.accessTokenExpiresAt,
      user: user._id,
    };

    const blobs = await this._dal.create<IUserToken>('tokens', [userToken]).run();
    const created = blobs[0];

    const oauthToken: Token = {
      accessToken: created._id,
      accessTokenExpiresAt: created.expire,
      user,
      client
    };

    callback(null, oauthToken);
    return oauthToken;
  }

  public getAccessToken(accessToken: string, callback?: Callback<Token>): Promise<false | '' | 0 | Token> {
    throw new Error('Method not implemented: getAccessToken.');
  }

  public verifyScope(token: Token, scope: string | string[], callback?: Callback<boolean>): Promise<boolean> {
    return Promise.resolve(true);
  }
}
