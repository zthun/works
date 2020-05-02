import { IZLogin } from '@zthun/auth.core';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ZNewUserForm } from './new-user-form.component';

describe('ZNewUserForm', () => {
  const SignInRoute = 'login';
  let _target: ShallowWrapper;
  let onCreate: (login: IZLogin) => Promise<void>;

  function createTestTarget() {
    _target = shallow((<ZNewUserForm signInRoute={SignInRoute} onCreate={onCreate} />));
    return _target;
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    onCreate = jest.fn();
  });

  afterEach(() => {
    _target.unmount();
  });

  it('renders the form.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZNewUserForm-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });

  function assertUpdatesField(expected: Partial<IZLogin>, value: string, clasz: string) {
    // Arrange
    const target = createTestTarget();
    // Act
    target.find(clasz).at(0).simulate('change', { target: { value } });
    target.update();
    target.find('.ZNewUserForm-btn-create').at(0).simulate('click');
    target.update();
    // Assert
    expect(onCreate).toHaveBeenCalledWith(jasmine.objectContaining(expected));
  }

  it('updates the email.', () => {
    const email = 'email@domain.com';
    assertUpdatesField({ email }, email, '.ZNewUserForm-input-email');

  });

  it('updates the password.', () => {
    const password = 'password';
    assertUpdatesField({ password }, password, '.ZNewUserForm-input-password');
  });

  it('updates the confirm.', () => {
    const confirm = 'confirm';
    assertUpdatesField({ confirm }, confirm, '.ZNewUserForm-input-confirm');
  });
});
