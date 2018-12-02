import { Callback, Client, PasswordModel, Token, User } from 'oauth2-server';

export class AuthPasswordModel implements PasswordModel {
  public getUser(username: string, password: string, callback?: Callback<false | '' | 0 | User>): Promise<false | '' | 0 | User> {
    throw new Error('Method not implemented: getUser.');
  }
  public getClient(clientId: string, clientSecret: string, callback?: Callback<false | '' | 0 | Client>): Promise<false | '' | 0 | Client> {
    throw new Error('Method not implemented: getClient.');
  }
  public saveToken(token: Token, client: Client, user: User, callback?: Callback<Token>): Promise<false | '' | 0 | Token> {
    throw new Error('Method not implemented: saveToken.');
  }
  public getAccessToken(accessToken: string, callback?: Callback<Token>): Promise<false | '' | 0 | Token> {
    throw new Error('Method not implemented: getAccessToken.');
  }
  public verifyScope(token: Token, scope: string | string[], callback?: Callback<boolean>): Promise<boolean> {
    return Promise.resolve(true);
  }
}
