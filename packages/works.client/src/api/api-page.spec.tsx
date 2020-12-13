/* eslint-disable require-jsdoc */

import { render } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ZApiPage } from './api-page';

describe('ZApiPage', () => {
  let history: MemoryHistory;

  function createTestTarget() {
    return render(
      <Router history={history}>
        <Route path='/api/:pkg' component={ZApiPage} />
      </Router>
    );
  }

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/api/works.core'] });
  });

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.queryByTestId('ZApiPage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
