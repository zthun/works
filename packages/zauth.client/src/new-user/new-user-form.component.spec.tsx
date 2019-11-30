import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { History } from 'history';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { ZNewUserForm } from './new-user-form.component';

describe('ZNewUserForm', () => {
  const SignInRoute = 'login';
  const NewUserEndpoint = 'api.newuser';
  let _target: ShallowWrapper;
  let history: History;

  function createTestTarget() {
    _target = shallow((<ZNewUserForm signInRoute={SignInRoute} newUserEndpoint={NewUserEndpoint} />));
    return _target;
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    history = {
      push: jest.fn()
    } as unknown as History<any>;
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
});
