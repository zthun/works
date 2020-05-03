import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ZLoginFormRecover } from './login-form-recover';

describe('ZForgotPasswordForm', () => {
  let _target: ShallowWrapper;

  function createTestTarget() {
    _target = shallow(<ZLoginFormRecover />);
    return _target;
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  afterEach(() => {
    _target.unmount();
  });

  it('renders the form.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZLoginFormRecover-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
