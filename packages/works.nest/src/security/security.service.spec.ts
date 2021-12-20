/* eslint-disable require-jsdoc */
import { IZConfigEntry, IZCookie, IZUser, ZConfigEntryBuilder, ZCookieBuilder, ZUserBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZCookiesClient, ZUsersClient } from '@zthun/works.microservices';
import { Request } from 'express';
import { v4 } from 'uuid';
import { ZWorksConfigService } from '../config/works-config.service';
import { ZSecurityService } from './security.service';

describe('ZSecurityService', () => {
  let secret: IZConfigEntry<string>;
  let domain: IZConfigEntry<string>;
  let cookie: IZCookie;
  let users: jest.Mocked<ZUsersClient>;
  let user: IZUser;
  let req: jest.Mocked<Request>;
  let cookies: jest.Mocked<ZCookiesClient>;
  let worksConfig: jest.Mocked<ZWorksConfigService>;

  function createTestTarget() {
    return new ZSecurityService(users, cookies, worksConfig);
  }

  beforeEach(() => {
    secret = new ZConfigEntryBuilder().scope(ZWorksConfigService.SCOPE_COOKIES).key(ZWorksConfigService.KEY_COOKIES_SECRET).generate().build();
    domain = new ZConfigEntryBuilder().scope(ZWorksConfigService.SCOPE_COMMON).key(ZWorksConfigService.KEY_COMMON_DOMAIN).value('marvel.com').build();
    cookie = new ZCookieBuilder().domain(domain.value).expiresTomorrow().secure().httpOnly().build();

    users = createMocked(['findByEmail', 'findById', 'login']);
    users.findByEmail.mockReturnValue(Promise.resolve(null));
    users.findById.mockReturnValue(Promise.resolve(null));
    users.login.mockReturnValue(Promise.resolve());

    cookies = createMocked(['createAuthentication', 'whoIs']);
    cookies.createAuthentication.mockResolvedValue(cookie);
    cookies.whoIs.mockResolvedValue(null);

    worksConfig = createMocked<ZWorksConfigService>(['domain', 'secret']);
    worksConfig.domain.mockResolvedValue(domain);
    worksConfig.secret.mockResolvedValue(secret);

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
