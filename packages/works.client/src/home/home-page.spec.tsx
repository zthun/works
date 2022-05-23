/* eslint-disable require-jsdoc */
import { act, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ZHomePage } from './home-page';

describe('ZHomePage', () => {
  let history: MemoryHistory;

  function createTestTarget() {
    return render(
      <Router location={history.location} navigator={history}>
        <ZHomePage />
      </Router>
    );
  }

  beforeEach(() => {
    history = createMemoryHistory();
  });

  async function assertNavigatesToPage(identifier: string, name: string) {
    // Arrange
    const target = createTestTarget();
    const expected = `/learn/${name}`;
    // Act
    await act(async () => {
      const box = await target.findByTestId(identifier);
      const learn = box.querySelector('.ZPaperCard-btn-action');
      fireEvent.click(learn);
    });
    // Assert
    expect(history.location.pathname).toEqual(expected);
  }

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.queryByTestId('ZHomePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('navigates to the works.react learn page.', async () => {
    await assertNavigatesToPage('ZHomePage-learn-react', 'works.react');
  });

  it('navigates to the works.nest learn page.', async () => {
    await assertNavigatesToPage('ZHomePage-learn-nest', 'works.nest');
  });

  it('navigates to the works.core learn page.', async () => {
    await assertNavigatesToPage('ZHomePage-learn-core', 'works.core');
  });

  it('navigates to the works.dal learn page.', async () => {
    await assertNavigatesToPage('ZHomePage-learn-data-access', 'works.dal');
  });

  it('navigates to the works.url learn page.', async () => {
    await assertNavigatesToPage('ZHomePage-learn-url', 'works.url');
  });

  it('navigates to the works.draw learn page.', async () => {
    await assertNavigatesToPage('ZHomePage-learn-draw', 'works.draw');
  });

  it('navigates to the works.jest learn page.', async () => {
    await assertNavigatesToPage('ZHomePage-learn-jest', 'works.jest');
  });

  it('navigates to the lint-janitor page.', async () => {
    await assertNavigatesToPage('ZHomePage-learn-lint-janitor', 'lint-janitor');
  });
});
