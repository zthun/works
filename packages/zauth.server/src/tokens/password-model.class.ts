import { UnauthorizedException } from '@nestjs/common';
import { IZUser, ZTokenBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { compare } from 'bcryptjs';
import { noop } from 'lodash';
import { Callback, Client, PasswordModel, Token, User } from 'oauth2-server';
import { Collections } from '../common/collections.enum';
import { ZHttpAssert } from '../common/http-assert.class';

export class ZTokensPasswordModel implements PasswordModel {
  public constructor(private readonly _dal: IZDatabase) { }

  public async getUser(username: string, password: string, callback: Callback<User>): Promise<User> {
    const blobs = await this._dal.read<IZUser>(Collections.Users).filter({ email: username }).run();
    ZHttpAssert.assert(blobs.length > 0, () => new UnauthorizedException('User email or password is incorrect.'));
    const user = blobs[0];
    const passwordsMatch = await compare(password, user.password);
    ZHttpAssert.assert(passwordsMatch, () => new UnauthorizedException('User email or password is incorrect.'));
    callback(null, user);
    return user;
  }

  public getClient(clientId: string, clientSecret: string, callback?: Callback<Client>): Promise<Client> {
    const client: Client = {
      id: clientId,
      grants: ['password']
    };
    callback(null, client);
    return Promise.resolve(client);
  }

  public async saveToken(token: Token, client: Client, user: User, callback: Callback<Token>): Promise<Token> {
    const tk = new ZTokenBuilder().token(token.accessToken).expire(token.accessTokenExpiresAt).user(user._id).build();
    await this._dal.create(Collections.Tokens, [tk]).run();
    token.client = client;
    token.user = user;
    callback(null, token);
    return token;
  }

  public getAccessToken(accessToken: string, callback: Callback<Token>): Promise<Token> {
    return Promise.resolve(null);
  }

  public verifyScope(token: Token, scope: string | string[], callback: Callback<boolean>): Promise<boolean> {
    return Promise.resolve(true);
  }
}
