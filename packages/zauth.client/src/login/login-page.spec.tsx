
import { shallow } from 'enzyme';
import React from 'react';
import { ZLoginPage } from './login-page';

describe('ZLoginPage', () => {
  function createTestTarget() {
    return shallow(<ZLoginPage />);
  }

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZLoginPage-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
