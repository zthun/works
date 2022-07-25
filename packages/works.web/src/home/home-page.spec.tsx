/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { ZTestRouter } from '@zthun/works.react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { ZHomePage } from './home-page';

describe('ZHomePage', () => {
  let history: MemoryHistory;

  function createTestTarget() {
    return render(
      <ZTestRouter location={history.location} navigator={history}>
        <ZHomePage />
      </ZTestRouter>
    );
  }

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.container.querySelector('.ZHomePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
