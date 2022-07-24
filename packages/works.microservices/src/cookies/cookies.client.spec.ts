/* eslint-disable require-jsdoc */
import { ClientProxy } from '@nestjs/microservices';
import { IZUser, ZConfigEntryBuilder, ZUserBuilder } from '@zthun/works.core';
import { assertProxySendsMessage, createMocked } from '@zthun/works.jest';
import { of } from 'rxjs';
import { v4 } from 'uuid';
import { ZCookiesClient } from './cookies.client';

describe('ZCookiesClient', () => {
  let proxy: jest.Mocked<ClientProxy>;
  let user: IZUser;
  let jwt: string;
  let secret: string;
  let domain: string;

  function createTestTarget() {
    return new ZCookiesClient(proxy);
  }

  beforeEach(() => {
    jwt = v4();
    user = new ZUserBuilder().id(v4()).build();
    secret = new ZConfigEntryBuilder().generate().build().value as string;
    domain = 'zthunworks.com';

    proxy = createMocked(['send']);
    proxy.send.mockReturnValue(of(null));
  });

  it('creates the authentication cookie.', async () => {
    await assertProxySendsMessage({ cmd: 'createAuthentication' }, { user, secret, domain }, proxy, createTestTarget, (t, p) => t.createAuthentication(p.user, p.secret, p.domain));
  });

  it('decodes the jwt secret.', async () => {
    await assertProxySendsMessage({ cmd: 'whoIs' }, { jwt, secret }, proxy, createTestTarget, (t, p) => t.whoIs(p.jwt, p.secret));
  });
});
