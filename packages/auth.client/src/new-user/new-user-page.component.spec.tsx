
import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ZNewUserPage } from './new-user-page.component';

describe('ZNewUserPage', () => {
  let history: MemoryHistory;
  let _target: ReactWrapper;

  function createTestTarget() {
    _target = mount(<Router history={history}><ZNewUserPage /></Router>);
    return _target;
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    _target.unmount();
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
