import { IZLogin, IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/auth.core';
import { v4 } from 'uuid';
import { ZLoginService } from '../login/login.service';
import { ZLoginFormComponent } from './login-form.component';

describe('ZLoginFormComponent', () => {
  let service: ZLoginService;
  let login: IZLogin;
  let user: IZUser;

  function createTestTarget() {
    const target = new ZLoginFormComponent(/*service*/);
    target.login = login;
    return target;
  }

  beforeEach(() => {
    login = new ZLoginBuilder().email('batman@gmail.com').password(v4()).autoConfirm().login();
    user = new ZUserBuilder().email(login.email).password(login.password).id(v4()).redact().user();

    service = {} as ZLoginService;
    service.create = jest.fn(() => Promise.resolve(user));
  });

  describe('Form', () => {
    it('updates the email.', () => {
      // Arrange
      const expected = 'superman@yahoo.com';
      const target = createTestTarget();
      // Act
      target.email(expected);
      // Assert
      expect(target.login.email).toEqual(expected);
    });

    it('raises the loginChange event when the email changes.', () => {
      // Arrange
      const expected = 'superman@yahoo.com';
      const target = createTestTarget();
      let actual: IZLogin;
      target.loginChange.subscribe((updated: IZLogin) => actual = updated);
      // Act
      target.email(expected);
      // Assert
      expect(actual.email).toEqual(expected);
    });

    it('updates the password.', () => {
      // Arrange
      const expected = 'another-super-secret. NANANANANANANANABATMAN!';
      const target = createTestTarget();
      // Act
      target.password(expected);
      // Assert
      expect(target.login.password).toEqual(expected);
    });

    it('raises the loginChange when the password is updated.', () => {
      // Arrange
      const expected = 'some-secret';
      let actual: IZLogin;
      const target = createTestTarget();
      target.loginChange.subscribe((updated: IZLogin) => actual = updated);
      // Act
      target.password(expected);
      // Assert
      expect(actual.password).toEqual(expected);
    });
  });
});
