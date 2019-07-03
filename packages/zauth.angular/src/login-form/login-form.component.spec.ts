import { IZLogin, IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/auth.core';
import { v4 } from 'uuid';
import { ZLoginFormComponent } from './login-form.component';

describe('ZLoginFormComponent', () => {
  let login: IZLogin;

  function createTestTarget() {
    return new ZLoginFormComponent();
  }

  beforeEach(() => {
    login = new ZLoginBuilder().email('batman@gmail.com').password(v4()).autoConfirm().build();
  });

  it('sets the login to the default when the login is set to falsy.', () => {
    // Arrange
    const target = createTestTarget();
    const expected = new ZLoginBuilder().build();
    target.login = login;
    // Act
    target.login = null;
    // Assert
    expect(JSON.stringify(target.login)).toEqual(JSON.stringify(expected));
  });

  it('sets the login.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.login = login;
    // Assert
    expect(JSON.stringify(target.login)).toEqual(JSON.stringify(login));
  });

  it('publishes the updated login.', () => {
    // Arrange
    const target = createTestTarget();
    const updated = jest.fn();
    target.login = login;
    target.loginChange.subscribe(updated);
    // Act
    target.publish();
    // Assert
    expect(updated).toHaveBeenCalledWith(jasmine.objectContaining(login));
  });
});
