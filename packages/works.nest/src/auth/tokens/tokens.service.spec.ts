/* eslint-disable require-jsdoc */
import { IZConfigEntry, IZCookie, IZLogin, IZUser, ZConfigEntryBuilder, ZCookieBuilder, ZLoginBuilder, ZUserBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZCookiesClient, ZUsersClient } from '@zthun/works.microservices';
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { ZCommonConfigService } from '../../config/common-config.service';
import { ZAuthConfigService } from '../config/auth-config.service';
import { ZTokensService } from './tokens.service';

describe('ZTokensService', () => {
  let secret: IZConfigEntry<string>;
  let domain: IZConfigEntry<string>;
  let cookie: IZCookie;
  let users: jest.Mocked<ZUsersClient>;
  let cookies: jest.Mocked<ZCookiesClient>;
  let commonConfig: jest.Mocked<ZCommonConfigService>;
  let authConfig: jest.Mocked<ZAuthConfigService>;

  function createTestTarget() {
    return new ZTokensService(users, cookies, commonConfig, authConfig);
  }

  beforeEach(() => {
    secret = new ZConfigEntryBuilder().scope(ZAuthConfigService.SCOPE).key(ZAuthConfigService.KEY_JWT).generate().build();
    domain = new ZConfigEntryBuilder().scope(ZCommonConfigService.SCOPE).key(ZCommonConfigService.KEY_DOMAIN).value('marvel.com').build();
    cookie = new ZCookieBuilder().domain(domain.value).expiresTomorrow().secure().httpOnly().build();

    users = createMocked(['findByEmail', 'findById', 'login']);
    users.findByEmail.mockReturnValue(Promise.resolve(null));
    users.findById.mockReturnValue(Promise.resolve(null));
    users.login.mockReturnValue(Promise.resolve());

    cookies = createMocked(['createAuthentication', 'whoIs']);
    cookies.createAuthentication.mockResolvedValue(cookie);
    cookies.whoIs.mockResolvedValue(null);

    commonConfig = createMocked<ZCommonConfigService>(['domain']);
    commonConfig.domain.mockReturnValue(Promise.resolve(domain));

    authConfig = createMocked<ZAuthConfigService>(['jwt']);
    authConfig.jwt.mockReturnValue(Promise.resolve(secret));
  });

  describe('Inject', () => {
    let res: jest.Mocked<Response>;
    let credentials: IZLogin;
    let user: IZUser;

    beforeEach(() => {
      credentials = new ZLoginBuilder().email('gambit@marvel.com').password('not-very-secure').autoConfirm().build();
      user = new ZUserBuilder().email(credentials.email).id(v4()).build();

      users.findByEmail.mockReturnValue(Promise.resolve(user));

      res = createMocked<Response>(['cookie', 'clearCookie']);
      res.cookie.mockReturnValue(res);
    });

    it('should inject the auth token into the response.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.inject(res, credentials);
      // Assert
      expect(res.cookie).toHaveBeenCalled();
    });

    it('should clear the auth token.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = new ZCookieBuilder().authentication().immortal().domain(domain.value).build();
      // Act
      await target.clear(res);
      // Assert
      expect(res.clearCookie).toHaveBeenCalledWith(expected.name, expect.objectContaining(expected));
    });

    it('should timestamp the user login.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.inject(res, credentials);
      // Assert
      expect(users.login).toHaveBeenCalledWith(user._id);
    });
  });

  describe('Extract', () => {
    let user: IZUser;
    let req: jest.Mocked<Request>;

    beforeEach(() => {
      user = new ZUserBuilder().email('wolverine@marvel.com').password('foo').id('0').super().build();
      users.findById.mockReturnValue(Promise.resolve(user));
      cookies.whoIs.mockResolvedValue(user._id);
      req = createMocked(['cookies']);
    });

    it('should extract the user from the auth cookie in the request.', async () => {
      // Arrange
      const target = createTestTarget();
      const cookie = new ZCookieBuilder().authentication(v4()).domain(domain.value).build();
      req.cookies[cookie.name] = cookie.value;
      // Act
      const actual = await target.extract(req);
      // Assert
      expect(actual).toEqual(user);
    });

    it('should return falsy if the token cannot be extracted.', async () => {
      // Arrange
      const target = createTestTarget();
      cookies.whoIs.mockResolvedValue(null);
      // Act
      const actual = await target.extract(req);
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
