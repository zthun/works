import { AuthorizationCodeModel, ClientCredentialsModel, ExtensionModel, PasswordModel, RefreshTokenModel } from 'oauth2-server';

/**
 * An list of models compatibile with the oauth2-server.
 */
export type OAuthModel = AuthorizationCodeModel | ClientCredentialsModel | RefreshTokenModel | PasswordModel | ExtensionModel;
