import { IZLogin, IZUser, ZConfigEntryBuilder, ZLoginBuilder, ZUserBuilder } from '@zthun/works.core';
import { Request, Response } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { v4 } from 'uuid';
import { ZConfigsService } from '../config/configs.service';
import { ZUsersService } from '../users/users.service';
import { ZJwtService } from './jwt.service';

describe('ZTokensRepositoryController', () => {
  let secret: string;
  let domain: string;
  let cfg: any;
  let config: jest.Mocked<ZConfigsService>;
  let users: jest.Mocked<ZUsersService>;

  function createTestTarget() {
    return new ZJwtService(config, users);
  }

  beforeEach(() => {
    secret = 'my-secret';
    domain = 'marvel.com';

    cfg = {
      'common': {
        domain: new ZConfigEntryBuilder().scope('common').key('domain').value(domain).build()
      },
      'authentication.secrets': {
        jwt: new ZConfigEntryBuilder().scope('authentication.secrets').key('jwt').value(secret).build()
      }
    };

    users = createSpyObj(ZUsersService, ['findByEmail', 'findById']);
    users.findByEmail.mockReturnValue(Promise.resolve(null));
    users.findById.mockReturnValue(Promise.resolve(null));

    config = createSpyObj(ZConfigsService, ['get']);
    config.get.mockImplementation((c) => Promise.resolve(cfg[c.scope][c.key]));
  });

  describe('Inject', () => {
    let res: jest.Mocked<Response>;
    let credentials: IZLogin;
    let user: IZUser;

    beforeEach(() => {
      credentials = new ZLoginBuilder().email('gambit@marvel.com').password('not-very-secure').autoConfirm().build();
      user = new ZUserBuilder().email(credentials.email).id(v4()).build();

      users.findByEmail.mockReturnValue(Promise.resolve(user));

      res = (createSpyObj('res', ['cookie', 'clearCookie']) as unknown) as jest.Mocked<Response>;
      res.cookie.mockReturnValue(res);
    });

    it('should inject the auth token into the response.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.inject(res, credentials);
      // Assert
      expect(res.cookie).toHaveBeenCalledWith(ZJwtService.COOKIE_NAME, expect.anything(), expect.objectContaining({ secure: true, sameSite: true, httpOnly: true, domain }));
    });

    it('should clear the auth token.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.clear(res);
      // Assert
      expect(res.clearCookie).toHaveBeenCalledWith(ZJwtService.COOKIE_NAME, expect.objectContaining({ secure: true, sameSite: true, httpOnly: true, domain }));
    });
  });

  describe('Extract', () => {
    let user: IZUser;
    let req: jest.Mocked<Request>;

    beforeEach(() => {
      user = new ZUserBuilder().email('wolverine@marvel.com').password('foo').id('0').super().build();
      users.findById.mockReturnValue(Promise.resolve(user));
      req = (createSpyObj('res', ['cookies']) as unknown) as jest.Mocked<Request>;
    });

    it('should extract the user from the auth cookie in the request.', async () => {
      // Arrange
      const target = createTestTarget();
      const jwt = await target.sign({ user: user.email }, secret);
      req.cookies[ZJwtService.COOKIE_NAME] = jwt;
      // Act
      const actual = await target.extract(req);
      // Assert
      expect(actual).toEqual(user);
    });

    it('should return falsy if the token cannot be extracted.', async () => {
      // Arrange
      const target = createTestTarget();
      users.findByEmail.mockRejectedValue('failed');
      // Act
      const actual = await target.extract(req);
      // Assert
      expect(actual).toBeFalsy();
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
