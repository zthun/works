import { IZLogin, ZLoginBuilder } from '@zthun/auth.core';
import { CookieOptions, Response } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { Token } from 'oauth2-server';
import { v4 } from 'uuid';
import { ZOauthServerService } from '../oauth/oauth-server.service';
import { ZTokensController } from './tokens.controller';

describe('ZTokensController', () => {
  let token: Token;
  let login: IZLogin;
  let oauth: jest.Mocked<ZOauthServerService>;
  let response: jest.Mocked<Response>;

  function createTestTarget() {
    return new ZTokensController(oauth);
  }

  beforeEach(() => {
    const exp = new Date();
    exp.setFullYear(exp.getFullYear() + 1);

    login = new ZLoginBuilder().email('user@some-domain.com').password('not-very-secure').build();

    token = {
      accessToken: v4(),
      accessTokenExpiresAt: exp,
      user: {
        _id: v4()
      },
      client: null
    };

    oauth = createSpyObj(ZOauthServerService, ['create', 'verify']);
    oauth.create.mockReturnValue(Promise.resolve(token));

    response = createSpyObj('response', ['cookie']) as unknown as jest.Mocked<Response>;
  });

  describe('Create/Login', () => {
    it('returns the token.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.create(login, response);
      // Assert
      expect(actual._id).toEqual(token.accessToken);
      expect(new Date(actual.exp).toJSON()).toEqual(token.accessTokenExpiresAt.toJSON());
    });

    it('throws a bad request exception if the email is not defined.', async () => {
      // Arrange
      const target = createTestTarget();
      delete login.email;
      // Act
      // Assert
      await expect(target.create(login, response)).rejects.toHaveProperty('status', 400);
    });

    it('throws a bad request exception if the password is not defined.', async () => {
      // Arrange
      const target = createTestTarget();
      delete login.password;
      // Act
      // Assert
      await expect(target.create(login, response)).rejects.toHaveProperty('status', 400);
    });

    it('sets an auth cookie.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.create(login, response);
      // Assert
      expect(response.cookie).toHaveBeenCalledWith('Authorization', `Bearer ${token.accessToken}`, expect.anything());
    });

    it('makes the auth cookie secure.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.create(login, response);
      // Assert
      expect(response.cookie).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.objectContaining<CookieOptions>({ secure: true }));
    });

    it('makes the auth cookie httpOnly.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.create(login, response);
      // Assert
      expect(response.cookie).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.objectContaining<CookieOptions>({ httpOnly: true }));
    });

    it('makes the auth cookie httpOnly.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.create(login, response);
      // Assert
      expect(response.cookie).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.objectContaining<CookieOptions>({ httpOnly: true }));
    });

    it('sets the cookie expiration.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.create(login, response);
      // Assert
      expect(response.cookie).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.objectContaining<CookieOptions>({ expires: token.accessTokenExpiresAt }));
    });
  });

  describe('Read/Verify', () => {
    it('TBD', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      expect(() => target.read()).toThrow();
    });
  });

  describe('Update/Refresh', () => {
    it('TBD', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      expect(() => target.update()).toThrow();
    });
  });

  describe('Delete/logout', () => {
    it('TBD', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      expect(() => target.remove()).toThrow();
    });
  });
});
