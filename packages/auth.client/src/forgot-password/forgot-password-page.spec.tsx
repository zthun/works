
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ZForgotPasswordPage } from './forgot-password-page';

describe('ZForgotPasswordPage', () => {
  function createTestTarget() {
    return shallow(<ZForgotPasswordPage />);
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZForgotPasswordPage-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
