import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ZAuthApp } from './auth-app';

describe('ZAuthApp', () => {
  function createTestTarget() {
    return shallow(<ZAuthApp />);
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('renders the application', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZAuthApp-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
