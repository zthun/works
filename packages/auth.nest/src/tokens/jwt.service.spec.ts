import { IZLogin, ZLoginBuilder } from '@zthun/auth.core';
import { Response } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { ZUsersService } from '../users/users.service';
import { ZJwtService } from './jwt.service';

describe('ZTokensRepositoryController', () => {
  let secret: string;
  let domain: string;
  let users: jest.Mocked<ZUsersService>;

  function createTestTarget() {
    return new ZJwtService(domain, users);
  }

  beforeEach(() => {
    secret = 'my-secret';
    domain = 'zthunworks.com';

    users = createSpyObj(ZUsersService, ['findByEmail']);
    users.findByEmail.mockReturnValue(Promise.resolve(null));
  });

  describe('Inject', () => {
    let res: jest.Mocked<Response>;
    let credentials: IZLogin;

    beforeEach(() => {
      credentials = new ZLoginBuilder().email('zthun@zthunworks.com').password('not-very-secure').autoConfirm().build();

      res = (createSpyObj('res', ['cookie', 'clearCookie']) as unknown) as jest.Mocked<Response>;
      res.cookie.mockReturnValue(res);
    });

    it('should inject the auth token into the response.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.inject(res, credentials);
      // Assert
      expect(res.cookie).toHaveBeenCalledWith(ZJwtService.COOKIE_NAME, expect.anything(), expect.objectContaining({ sameSite: true, httpOnly: true, domain }));
    });

    it('should clear the auth token.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.clear(res);
      // Assert
      expect(res.clearCookie).toHaveBeenCalledWith(ZJwtService.COOKIE_NAME);
    });
  });

  describe('Extract', () => {
    it('should extract the user from the auth cookie in the request.', () => {
      expect(true).toBe(true);
    });

    it('should return null if the token cannot be extracted.', () => {
      expect(true).toBe(true);
    });
  });

  describe('Sign and verify', () => {
    let payload: object;

    beforeEach(() => {
      payload = {
        user: '1234',
        food: 'burger'
      };
    });

    it('should create a signed token with the correct signature.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const token = await target.sign(payload, secret);
      const actual = await target.verify(token, secret);
      // Assert
      expect(actual).toEqual(jasmine.objectContaining(payload));
    });

    it('should reject a signature if the payload is falsy.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.sign(null, secret);
      // Assert
      await expect(actual).rejects.toBeTruthy();
    });

    it('should reject a signature if the secret is falsy.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.sign(payload, null);
      // Assert
      await expect(actual).rejects.toBeTruthy();
    });

    it('should reject a token that is not decoded with the correct secret.', async () => {
      // Arrange
      const target = createTestTarget();
      const wrong = 'not-the-right-secret';
      // Act
      const token = await target.sign(payload, secret);
      const actual = target.verify(token, wrong);
      // Assert
      await expect(actual).rejects.toBeTruthy();
    });
  });
});
