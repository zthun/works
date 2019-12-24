import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IZToken, IZUser, ZTokenBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { compare } from 'bcryptjs';
import { noop } from 'lodash';
import { Callback, Client, PasswordModel, Token, User } from 'oauth2-server';
import { Collections } from '../common/collections.enum';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';

/**
 * Represents the password oauth model.
 */
@Injectable()
export class ZOauthPasswordService implements PasswordModel {
  /**
   * Initializes a new instance to this object.
   *
   * @param _dal The data access layer.
   */
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) { }

  /**
   * Retrieves a user.
   *
   * The username and password must match in order to retrieve the user.
   *
   * @param username The username for the user.
   * @param password The user password.
   * @param callback The user callback method.
   *
   * @returns A promise that, when resolved, will have the user.
   *
   * @throws UnauthorizedException if the email or password is incorrect.
   */
  public async getUser(username: string, password: string, callback: Callback<User>): Promise<User> {
    const blobs = await this._dal.read<IZUser>(Collections.Users).filter({ email: username }).run();
    ZHttpAssert.assert(blobs.length > 0, () => new UnauthorizedException('User email or password is incorrect.'));
    const user = blobs[0];
    const passwordsMatch = await compare(password, user.password);
    ZHttpAssert.assert(passwordsMatch, () => new UnauthorizedException('User email or password is incorrect.'));
    callback(null, user);
    return user;
  }

  /**
   * Retrieves the client.
   *
   * @param id Can be anything.
   * @param secret Ignored.
   * @param callback The client callback.
   *
   * @returns A promise that, when resolved, has a client that grants the password flow with the
   * given id.
   */
  public getClient(id: string, secret: string, callback: Callback<Client>): Promise<Client> {
    const grants = ['password'];
    const client: Client = { id, grants };
    callback(null, client);
    return Promise.resolve(client);
  }

  /**
   * Saves a token to the database.
   *
   * @param token The token to save.
   * @param client The client returned from getClient.
   * @param user The user returned from getUser.
   * @param callback The token callback.
   *
   * @returns A promise that, when resolved, has the token that was saved.
   */
  public async saveToken(token: Token, client: Client, user: User, callback: Callback<Token>): Promise<Token> {
    const tk = new ZTokenBuilder().token(token.accessToken).expire(token.accessTokenExpiresAt).user(user._id).build();
    await this._dal.create(Collections.Tokens, [tk]).run();
    token.client = client;
    token.user = user;
    callback(null, token);
    return token;
  }

  /**
   * Gets an access token that was previously saved and not expired.
   *
   * @param accessToken The id of the token to retrieve.
   * @param callback The token callback.
   *
   * @returns A promise that, when resolved, has the token information.
   */
  public async getAccessToken(accessToken: string, callback: Callback<Token>): Promise<Token> {
    const tks = await this._dal.read<IZToken>(Collections.Tokens).filter({ _id: accessToken }).run();
    ZHttpAssert.assert(!!tks.length, () => new UnauthorizedException('Unauthorized'));
    const tk = tks[0];
    const now = new Date();
    const exp = new Date(tk.exp);
    ZHttpAssert.assert(exp.getTime() > now.getTime(), () => new UnauthorizedException('Session expired.  Please login again.'));
    const users = await this._dal.read<IZUser>(Collections.Users).filter({ _id: tk.userId }).run();
    ZHttpAssert.assert(!!users.length, () => new UnauthorizedException('User is no longer authorized for any actions.'));
    const user = users[0];
    const client = await this.getClient('internal', null, noop);

    const otk = {
      accessToken: tk._id,
      accessTokenExpiresAt: new Date(tk.exp),
      client,
      user
    };

    callback(null, otk);
    return otk;
  }

  /**
   * Verifies that a given token gives access to an existing scope (read: group) object.
   *
   * @param token The token to verify.
   * @param scope The id of the scope listing the permissions to check.
   * @param callback The verification callback.
   *
   * @returns A promise that when resolved, returns true if the token is allowed to access the given scope,
   *          or false if the token is not allowed access.
   */
  public verifyScope(token: Token, scope: string, callback: Callback<boolean>): Promise<boolean> {
    return Promise.resolve(true);
  }
}
