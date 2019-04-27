import { IZLogin, IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/auth.core';
import { v4 } from 'uuid';
import { ZLoginsController } from './logins.controller';
import { ZLoginsService } from './logins.service';

describe('ZLoginsController', () => {
  let login: IZLogin;
  let user: IZUser;
  let service: ZLoginsService;

  function createTestTarget() {
    return new ZLoginsController(service);
  }

  beforeEach(() => {
    login = new ZLoginBuilder().email(v4()).password(v4()).login();
    user = new ZUserBuilder().id(v4()).email(login.email).password(v4()).logout().login().user();

    service = jest.fn() as unknown as ZLoginsService;
    service.login = jest.fn(() => Promise.resolve(user));
    service.logout = jest.fn(() => Promise.resolve(user));
  });

  it('returns the logged in user.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.update(login);
    // Assert
    expect(service.login).toHaveBeenCalledWith(login);
    expect(actual).toBe(user);
  });

  it('logs the user out.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.remove({ id: user._id });
    // Assert
    expect(service.logout).toHaveBeenCalledWith(user._id);
    expect(actual).toBe(user);
  });
});
