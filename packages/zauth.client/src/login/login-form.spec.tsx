import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { History } from 'history';
import React from 'react';
import { ZLoginFormBase } from './login-form';

describe('ZLoginForm', () => {
  const ForgotRoute = 'forgot';
  const CreateAccountRoute = 'create';
  let _target: ShallowWrapper;
  let history: History;

  function createTestTarget() {
    _target = shallow((<ZLoginFormBase forgotPasswordRoute={ForgotRoute} createAccountRoute={CreateAccountRoute} match={null} location={null} history={history} />));
    return _target;
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    history = {
      push: jest.fn()
    } as unknown as History;
  });

  afterEach(() => {
    _target.unmount();
  });

  describe('Existing user', () => {
    it('renders the form.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.find('.ZLoginForm-existing-user');
      // Assert
      expect(actual.length).toBeGreaterThan(0);
    });
  });

  describe('New user', () => {
    it('renders the form.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.find('.ZLoginForm-new-user');
      // Assert
      expect(actual.length).toBeGreaterThan(0);
    });

    it('redirects the user to the create account route when the button is clicked.', () => {
      // Arrange
      const target = createTestTarget();
      const btn = target.find('.ZLoginForm-new-user-btn').first();
      // Act
      btn.simulate('click');
      // Assert
      expect(history.push).toHaveBeenCalledWith(CreateAccountRoute);
    });
  });

  describe('Forgot password', () => {
    it('renders the form.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.find('.ZLoginForm-forgot-password');
      // Assert
      expect(actual.length).toBeGreaterThan(0);
    });

    it('redirects the user to the recover account route when the button is clicked.', () => {
      // Arrange
      const target = createTestTarget();
      const btn = target.find('.ZLoginForm-forgot-password-btn').first();
      // Act
      btn.simulate('click');
      // Assert
      expect(history.push).toHaveBeenCalledWith(ForgotRoute);
    });
  });
});
