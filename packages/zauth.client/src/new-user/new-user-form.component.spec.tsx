import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { History } from 'history';
import React from 'react';
import { ZNewUserFormBase } from './new-user-form.component';

describe('ZLoginForm', () => {
  const SignInRoute = 'login';
  const NewUserEndpoint = 'api.newuser';
  let _target: ShallowWrapper;
  let history: History;

  function createTestTarget() {
    _target = shallow((<ZNewUserFormBase signInRoute={SignInRoute} newUserEndpoint={NewUserEndpoint} match={null} location={null} history={history} />));
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

  it('redirects the user to the sign in route when the button is clicked.', () => {
    // Arrange
    const target = createTestTarget();
    const btn = target.find('.ZNewUserForm-return-to-sign-in-btn').first();
    // Act
    btn.simulate('click');
    // Assert
    expect(history.push).toHaveBeenCalledWith(SignInRoute);
  });
});
