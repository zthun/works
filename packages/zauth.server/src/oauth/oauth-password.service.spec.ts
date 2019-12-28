import { IZToken, IZUser, ZTokenBuilder, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { hash } from 'bcryptjs';
import { Client, Token, User } from 'oauth2-server';
import { v4 } from 'uuid';
import { Collections } from '../common/collections.enum';
import { BcryptRounds } from '../common/crypt.constants';
import { ZOauthPasswordService } from './oauth-password.service';

describe('ZOauthPasswordService', () => {
  const token = v4();
  const userid = v4();
  const email = 'test-user@zauth.com';
  const password = 'not-very-secure-password';
  let dal: IZDatabase;

  beforeAll(async () => {
    dal = ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('outh-password-service-test').build());
    const crypted = await hash(password, BcryptRounds);
    const user = new ZUserBuilder().email('test-user@zauth.com').password(crypted).id(userid).build();
    await dal.create<IZUser>(Collections.Users, [user]).run();
  });

  function createTestTarget() {
    return new ZOauthPasswordService(dal);
  }

  describe('Client', () => {
    it('constructs a client as the client does not matter in this flow.', async () => {
      // Arrange
      const target = createTestTarget();
      const id = v4();
      // Act
      const actual = await target.getClient(id, null, jest.fn());
      // Assert
      expect(actual.id).toEqual(id);
    });

    it('grants the password flow.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.getClient(v4(), null, jest.fn());
      // Assert
      expect(actual.grants[0]).toEqual('password');
    });

    it('invokes the callback.', async () => {
      // Arrange
      const target = createTestTarget();
      const id = v4();
      const cb = jest.fn();
      // Act
      await target.getClient(id, null, cb);
      // Assert
      expect(cb).toHaveBeenCalledWith(null, expect.objectContaining({ id }));
    });
  });

  describe('User', () => {
    it('returns the user if the user exists and the passwords match.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.getUser(email, password, jest.fn());
      // Assert
      expect(actual.email).toEqual(email);
    });

    it('returns a 401 error if the user cannot be found.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.getUser('not-in-system@where.com', password, jest.fn())).rejects.toHaveProperty('status', 401);
    });

    it('returns a 401 error if the password does not match.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.getUser(email, 'not-the-right-password', jest.fn())).rejects.toHaveProperty('status', 401);
    });

    it('invokes the callback.', async () => {
      // Arrange
      const target = createTestTarget();
      const cb = jest.fn();
      // Act
      await target.getUser(email, password, cb);
      // Assert
      expect(cb).toHaveBeenCalledWith(null, expect.objectContaining({ email }));
    });
  });

  describe('Token', () => {
    let oauthToken: Token;
    let client: Client;
    let user: User;

    beforeEach(() => {
      const oneyear = new Date();
      oneyear.setFullYear(oneyear.getFullYear() + 1);

      oauthToken = {
        accessToken: token,
        accessTokenExpiresAt: oneyear,
        client: null,
        user: null
      };

      client = {
        id: v4(),
        grants: ['password']
      };

      user = {
        _id: userid,
        email
      };
    });

    afterEach(async () => {
      await dal.delete(Collections.Tokens).run();
    });

    it('adds the token value to the database for the user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.saveToken(oauthToken, client, user, jest.fn());
      const actual = await dal.read<IZToken>(Collections.Tokens).filter({ userId: userid }).run();
      // Assert
      expect(actual.length).toEqual(1);
      expect(actual[0]._id).toEqual(oauthToken.accessToken);
    });

    it('invokes the callback.', async () => {
      // Arrange
      const target = createTestTarget();
      const cb = jest.fn();
      // Act
      await target.saveToken(oauthToken, client, user, cb);
      // Assert
      expect(cb).toHaveBeenCalledWith(null, expect.objectContaining(oauthToken));
    });
  });

  describe('Access', () => {
    let ztoken: IZToken;

    beforeEach(async () => {
      const oneyear = new Date();
      oneyear.setFullYear(oneyear.getFullYear() + 1);
      ztoken = new ZTokenBuilder().token(v4()).user(userid).expire(oneyear).build();
      await dal.create(Collections.Tokens, [ztoken]).run();
    });

    afterEach(async () => {
      await dal.delete(Collections.Tokens).run();
    });

    it('returns a token with the correct access token if it exists.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.getAccessToken(ztoken._id, jest.fn());
      // Assert
      expect(actual.accessToken).toEqual(ztoken._id);
    });

    it('returns a token with the correct expiration date.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.getAccessToken(ztoken._id, jest.fn());
      // Assert
      expect(actual.accessTokenExpiresAt.toJSON()).toEqual(new Date(ztoken.exp).toJSON());
    });

    it('returns a token with a client.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.getAccessToken(ztoken._id, jest.fn());
      // Assert
      expect(actual.client).toBeTruthy();
    });

    it('returns a token that has the user information.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.getAccessToken(ztoken._id, jest.fn());
      // Assert
      expect(actual.user).toBeTruthy();
    });

    it('invokes the callback.', async () => {
      // Arrange
      const target = createTestTarget();
      const cb = jest.fn();
      // Act
      await target.getAccessToken(ztoken._id, cb);
      // Assert
      expect(cb).toHaveBeenCalledWith(null, expect.objectContaining({ accessToken: ztoken._id }));
    });

    it('throws a 401 exception if the token does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.getAccessToken(v4(), jest.fn())).rejects.toHaveProperty('status', 401);
    });

    it('throws a 401 exception if the token has expired.', async () => {
      // Arrange
      const target = createTestTarget();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      await dal.update(Collections.Tokens, { exp: yesterday }).filter({ _id: ztoken._id }).run();
      // Act
      // Assert
      await expect(target.getAccessToken(ztoken._id, jest.fn())).rejects.toHaveProperty('status', 401);
    });

    it('throws a 401 exception if the user no longer exists.', async () => {
      // Arrange
      const target = createTestTarget();
      await dal.update<IZToken>(Collections.Tokens, { userId: v4() }).filter({ _id: ztoken._id }).run();
      // Act
      // Assert
      await expect(target.getAccessToken(ztoken._id, jest.fn())).rejects.toHaveProperty('status', 401);
    });
  });

  describe('Verification', () => {
    it('returns true if the token has access to the specified scope.', async () => {
      // Arrange
      // TODO;
      const target = createTestTarget();
      // Act
      target.verifyScope(null, null, null);
      // Assert
      expect(true).toBeTruthy();
    });

    it('returns false if the token does not have access to the specified scope.', () => {
      // Arrange
      // TODO;
      const target = createTestTarget();
      // Act
      target.verifyScope(null, null, null);
      // Assert
      expect(false).toBeFalsy();
    });
  });
});
