import { Injectable } from '@nestjs/common';
import OAuth2Server, { Request, Response, Token } from 'oauth2-server';
import { v4 } from 'uuid';
import { ZOauthPasswordService } from './oauth-password.service';

/**
 * Represents the server wrapper that implements the oauth workflow.
 */
@Injectable()
export class ZOauthServerService {
  private _server: OAuth2Server;

  /**
   * Initializes a new instance of this object.
   *
   * @param password The password model.
   */
  public constructor(password: ZOauthPasswordService) {
    this._server = new OAuth2Server({ model: password });
  }

  /**
   * Creates a new auth token.
   *
   * @param username The username that holds the token.
   * @param password The user password.
   */
  public create(username: string, password: string): Promise<Token> {
    const oreq = new Request({
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'transfer-encoding': 'identity',
        'content-length': Number.MAX_SAFE_INTEGER
      },
      query: {},
      method: 'POST',
      body: {
        username,
        password,
        client_id: v4(),
        client_secret: v4(),
        grant_type: 'password'
      }
    });
    return this._server.token(oreq, new Response());
  }
}
