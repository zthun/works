import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IZLogin, IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory } from '@zthun/dal';
import { hash } from 'bcrypt';
import { utc } from 'moment';
import { Collections } from '../common/collections.enum';
import { ZLoginsService } from './logins.service';

jest.setTimeout(60000);

beforeAll(async () => {
  await ZDatabaseMemory.start();
});

afterAll(async () => {
  await ZDatabaseMemory.kill();
});

describe('ZLoginsService', () => {
  let dal: IZDatabase;
  let user: IZUser;
  let login: IZLogin;

  function createTestTarget() {
    return new ZLoginsService(dal);
  }

  beforeEach(async () => {
    dal = ZDatabaseMemory.connect('logins-service-test');

    login = new ZLoginBuilder().email('batman@gmail.com').password('bat-plane').autoConfirm().login();

    const passwordForLogin = await hash(login.password, 10);
    const template = new ZUserBuilder().email(login.email).password(passwordForLogin).user();
    const blobs = await dal.create(Collections.Users, [template]).run();
    user = blobs[0];
  });

  afterEach(async () => {
    await dal.delete(Collections.Users).run();
  });

  describe('Login', () => {
    it('throws a BadRequestException if there is no email.', async () => {
      // Arrange
      const target = createTestTarget();
      delete login.email;
      // Act
      // Assert
      await expect(target.login(login)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws a BadRequestException if there is no password.', async () => {
      // Arrange
      const target = createTestTarget();
      delete login.password;
      // Act
      // Assert
      await expect(target.login(login)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws an UnauthorizedException if there is no corresponding email in the system.', async () => {
      // Arrange
      const target = createTestTarget();
      login.email = 'notinsystem@aol.com';
      // Act
      // Assert
      await expect(target.login(login)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws an UnauthorizedException if there is no corresponding email/password combination in the system.', async () => {
      // Arrange
      const target = createTestTarget();
      login.password = 'not batmans password';
      // Act
      // Assert
      await expect(target.login(login)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('returns the logged in user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.login(login);
      const blobs = await dal.read<IZUser>(Collections.Users).filter({ _id: user._id }).run();
      const expected = blobs[0];
      // Assert
      expect(actual._id).toEqual(expected._id);
      expect(actual.login).toEqual(expected.login);
    });

    it('marks the user as logged in.', async () => {
      // Arrange
      const expected = utc().unix();
      const target = createTestTarget();
      // Act
      await target.login(login);
      const blobs = await dal.read<IZUser>(Collections.Users).filter({ _id: user._id }).run();
      const actual = blobs[0];
      // Assert
      expect(actual.login).toBeGreaterThanOrEqual(expected);
    });
  });

  describe('Logout', () => {
    it('throws a NotFoundException if the user does not exist in the system.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.logout('-1')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('marks the user as logged out.', async () => {
      // Arrange
      const expected = utc().unix();
      const target = createTestTarget();
      // Act
      user = await target.login(login);
      await target.logout(user._id);
      const blobs = await dal.read<IZUser>(Collections.Users).filter({ _id: user._id }).run();
      const actual = blobs[0];
      // Assert
      expect(actual.logout).toBeGreaterThanOrEqual(expected);
    });

    it('returns the logged out user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      user = await target.login(login);
      const actual = await target.logout(user._id);
      const blobs = await dal.read<IZUser>(Collections.Users).filter({ _id: user._id }).run();
      const expected = blobs[0];
      // Assert
      expect(actual._id).toEqual(expected._id);
      expect(actual.logout).toEqual(expected.logout);
    });
  });
});
