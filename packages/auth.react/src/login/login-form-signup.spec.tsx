import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ZLoginFormSignup } from './login-form-signup';

describe('ZNewUserPage', () => {
  let _target: ShallowWrapper;

  function createTestTarget() {
    _target = shallow(<ZLoginFormSignup />);
    return _target;
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  afterEach(() => {
    _target.unmount();
  });

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZLoginFormSignup-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
