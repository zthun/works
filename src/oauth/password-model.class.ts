import { Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { IZDatabase } from '@zthun/dal';
import { Callback, Client, PasswordModel, Token, User } from 'oauth2-server';
import { Collections } from '../common/collections.enum';
import { DatabaseToken } from '../common/injection.constants';

/**
 * Represents the implementation of the password model for the oauth server.
 */
@Injectable()
export class ZPasswordModel implements PasswordModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _dal The data access layer for retrieving database information.
   */
  public constructor(@Inject(DatabaseToken) private _dal: IZDatabase) { }

  /**
   * Gets the user.
   *
   * @param username The email of the user.
   * @param password Ignored.
   * @param callback The callback that will be invoked with the given user.
   *
   * @returns A promise that, when resolved, will return the user.
   */
  public async getUser(username: string, password: string, callback?: Callback<User>): Promise<User> {
    const filter = { email: { $eq: username } };
    const users = await this._dal.read<any>(Collections.Users).filter(filter).run();
    const user = users[0];
    callback(null, user);
    return user;
  }

  /**
   * Gets the client.
   *
   * @param clientId The client id.
   * @param clientSecret The client secret.
   * @param callback The callback that will be invoked when the client is created.
   *
   * @return A promise that, when resolved, will return the client.
   */
  public getClient(clientId: string, clientSecret: string, callback?: Callback<Client>): Promise<Client> {
    const client: Client = {
      id: clientId,
      grants: ['password'],
    };

    callback(null, client);
    return Promise.resolve(client);
  }

  public async saveToken(oauthToken: Token, client: Client, user: User, callback?: Callback<Token>): Promise<Token> {
    const token = { ...oauthToken };
    token._id = token.accessToken;
    delete token.accessToken;
    token.userId = user._id;
    await this._dal.create<Token>(Collections.Tokens, [token]).run();
    token.client = client;
    token.user = user;
    const result = { ...oauthToken, ...token };
    callback(null, result);
    return result;
  }

  public async getAccessToken(accessToken: string, callback?: Callback<Token>): Promise<Token> {
    const accessFilter = { accessToken };
    const blobs = await this._dal.read<Token>(Collections.Tokens).filter(accessFilter).run();
    const token = blobs[0];
    callback(null, token);
    return token;
  }

  public verifyScope(token: Token, scope: string | string[], callback?: Callback<boolean>): Promise<boolean> {
    throw new NotImplementedException('Method not implemented.');
  }
}
