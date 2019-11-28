
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ZNewUserPage } from './new-user-page';

describe('ZNewUserPage', () => {
  function createTestTarget() {
    return shallow(<ZNewUserPage />);
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZNewUserPage-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
