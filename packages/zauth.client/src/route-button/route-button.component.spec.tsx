import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ZRouteButton } from './route-button.component';

describe('ZRouteButton', () => {
  let _target: ReactWrapper;
  let route: string;
  let history: MemoryHistory;

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    history = createMemoryHistory();
    route = 'test-route';
  });

  afterEach(() => {
    _target.unmount();
  });

  function createTestTarget() {
    _target = mount(<Router history={history}><ZRouteButton route={route}>Test Route</ZRouteButton></Router>);
    return _target;
  }

  it('adds to the history when the button is clicked.', async () => {
    // Arrange
    const target = createTestTarget();
    const expected = `/${route}`;
    // Act
    const actual = target.find('.ZRouteButton-root').at(0);
    actual.simulate('click');
    // Assert
    expect(history.location.pathname).toEqual(expected);
  });
});
