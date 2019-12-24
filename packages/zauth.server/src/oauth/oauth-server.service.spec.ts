import { createSpyObj } from 'jest-createspyobj';
import { Client, Token, User } from 'oauth2-server';
import { v4 } from 'uuid';
import { ZOauthPasswordService } from './oauth-password.service';
import { ZOauthServerService } from './oauth-server.service';

jest.mock('./oauth-password.service');

describe('ZOauthServerService', () => {
  let user: User;
  let client: Client;
  let token: Token;
  let password: jest.Mocked<ZOauthPasswordService>;

  function createTestTarget() {
    return new ZOauthServerService(password);
  }

  beforeEach(() => {
    user = {
      username: 'test-user',
      password: 'not-very-secure-password'
    };

    client = {
      id: v4(),
      grants: ['password'],
    };

    token = {
      accessToken: v4(),
      accessTokenExpiresAt: null,
      client,
      user,
      scope: ['*']
    };

    password = createSpyObj<ZOauthPasswordService>(ZOauthServerService, ['getUser', 'saveToken', 'getClient', 'getAccessToken', 'verifyScope']);
    password.getUser.mockReturnValue(Promise.resolve(user));
    password.saveToken.mockReturnValue(Promise.resolve(token));
    password.getClient.mockReturnValue(Promise.resolve(client));
    password.getAccessToken.mockReturnValue(Promise.resolve(token));
    password.verifyScope.mockReturnValue(Promise.resolve(true));
  });

  describe('Create', () => {
    it('constructs a token.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.create(user.username, user.password);
      // Assert
      expect(actual).toBe(token);
    });
  });
});
