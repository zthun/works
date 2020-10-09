/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { ZStatusCodePage } from './status-code-page';
import { createMemoryHistory } from 'history';

describe('ZStatusCodePage', () => {
  function createTestTarget() {
    const history = createMemoryHistory({ initialEntries: ['/error/404'] });

    return render(
      <Router history={history}>
        <Route path='/error/:code' component={ZStatusCodePage} />
      </Router>
    );
  }

  it('should render the page.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZStatusCodePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
