import { shallow } from 'enzyme';
import React from 'react';
import { ZAuthApp } from './auth-app';

describe('ZAuthApp', () => {
  function createTestTarget() {
    return shallow(<ZAuthApp />);
  }

  it('renders the application', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZAuthApp-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
