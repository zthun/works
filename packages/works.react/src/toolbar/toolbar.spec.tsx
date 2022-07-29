/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { ZToolbar } from './toolbar';
import { ZToolbarItemButton } from './toolbar-item-button';
import { ZToolbarItemRoute } from './toolbar-item-route';

describe('ZToolbar', () => {
  let history: MemoryHistory;
  let routePath: string;
  let onButtonClick: jest.Mock;

  async function createTestTarget() {
    const target = render(
      <Router location={history.location} navigator={history}>
        <ZToolbar>
          <ZToolbarItemButton className='test-toolbar-button' headerText='Toolbar Button' onClick={onButtonClick} />
          <ZToolbarItemRoute className='test-toolbar-route' headerText='Toolbar Route' path={routePath} />
        </ZToolbar>
      </Router>
    );

    await waitFor(() => expect(target.container.querySelector('.ZToolbar-root')).toBeTruthy());

    return target;
  }

  beforeEach(() => {
    history = createMemoryHistory();
    routePath = 'test-path';
    onButtonClick = jest.fn();
  });

  describe('Route', () => {
    async function clickToolbarRoute(target: RenderResult) {
      const item = target.container.querySelector(`.test-toolbar-route`)!;
      await act(async () => {
        fireEvent.click(item);
      });
    }

    it('should route to the given path on click', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      await clickToolbarRoute(target);
      const actual = history.location.pathname;
      // Assert
      expect(actual).toEqual(`/${routePath}`);
    });
  });

  describe('Button', () => {
    async function clickToolbarButton(target: RenderResult) {
      const item = target.container.querySelector(`.test-toolbar-button`)!;
      await act(async () => {
        fireEvent.click(item);
      });
    }

    it('should invoke the onClick when clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      await clickToolbarButton(target);
      // Assert
      expect(onButtonClick).toHaveBeenCalled();
    });
  });

  describe('Menu', () => {
    // TODO
  });
});
