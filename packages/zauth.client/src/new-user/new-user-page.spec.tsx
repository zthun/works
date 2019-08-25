
import { shallow } from 'enzyme';
import React from 'react';
import { ZNewUserPage } from './new-user-page';

describe('ZNewUserPage', () => {
  function createTestTarget() {
    return shallow(<ZNewUserPage />);
  }

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZNewUserPage-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
