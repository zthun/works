/* eslint-disable require-jsdoc */

import { act, fireEvent, render } from '@testing-library/react';
import { IZTypedoc, ZTypedocKind } from '@zthun/works.core';
import Axios from 'axios';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ZApiPage } from './api-page';

jest.mock('axios');

describe('ZApiPage', () => {
  let pkg: string;
  let history: MemoryHistory;
  let typedoc: IZTypedoc;

  function createTestTarget() {
    return render(
      <Router history={history}>
        <Route path='/api/:pkg' component={ZApiPage} />
      </Router>
    );
  }

  beforeEach(() => {
    pkg = 'works.core';
    history = createMemoryHistory({ initialEntries: [`/api/${pkg}`] });

    typedoc = {
      name: '@zthun/works.core',
      children: [
        {
          id: 11,
          name: 'ZBinaryOperator',
          kind: ZTypedocKind.Enum
        }
      ],
      groups: [
        {
          title: 'Enumerations',
          kind: ZTypedocKind.Enum,
          children: [11]
        }
      ]
    };

    (Axios.get as jest.Mock).mockResolvedValue({ data: typedoc });
  });

  afterEach(() => {
    (Axios.get as jest.Mock).mockClear();
  });

  it('renders the api.', async () => {
    // Arrange
    const expected = `ZTypedocViewer-entity-${typedoc.children[0].id}`;
    let actual: HTMLElement = null;
    // Act
    await act(async () => {
      const target = createTestTarget();
      actual = await target.findByTestId(expected);
    });
    // Assert
    expect(actual).toBeTruthy();
  });

  it('navigates back to the learn page when the learn button is clicked.', async () => {
    // Arrange
    // Act
    await act(async () => {
      const target = createTestTarget();
      const btn = await target.findByTestId('ZApiPage-btn-learn');
      fireEvent.click(btn);
    });
    // Assert
    expect(history.location.pathname).toEqual(`/learn/${pkg}`);
  });
});
