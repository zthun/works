
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ZLoginPage } from './login-page';

describe('ZLoginPage', () => {
  function createTestTarget() {
    return shallow(<ZLoginPage />);
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZLoginPage-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
