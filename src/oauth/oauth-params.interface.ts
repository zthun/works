/**
 * The parameters for oauth.
 */
export interface IZOAuthParams {
  /**
   * The grant type.
   *
   * This should always be 'password'.
   */
  grant_type: 'password';
  /**
   * The username.
   *
   * This should be the email of the login.
   */
  username: string;
  /**
   * The user password.
   *
   * This should be the password of the login.
   */
  password: string;
  /**
   * The id of the client.
   *
   * Should always be 'zauth.services'
   */
  client_id: 'zauth.services';
  /**
   * The client secret.
   *
   * Should always be 'none'.
   */
  client_secret: 'none';
}
