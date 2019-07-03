import { IZLogin, ZLoginBuilder } from '@zthun/auth.core';
import { v4 } from 'uuid';
import { ZCreateFormComponent } from './create-form.component';

describe('CreateFormComponent', () => {
  let login: IZLogin;

  function createTestTarget() {
    return new ZCreateFormComponent();
  }

  beforeEach(() => {
    login = new ZLoginBuilder().email('batman@gmail.com').password(v4()).autoConfirm().build();
  });

  it('raises the create event.', () => {
    // Arrange
    const target = createTestTarget();
    const created = jest.fn();
    target.login = login;
    target.create.subscribe(created);
    // Act
    target.publish();
    // Assert
    expect(created).toHaveBeenCalledWith(jasmine.objectContaining(login));
  });
});
