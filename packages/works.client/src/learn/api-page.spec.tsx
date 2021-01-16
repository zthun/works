/* eslint-disable require-jsdoc */

import { act, fireEvent, render } from '@testing-library/react';
import { IZTypedoc, ZTypedocKind, ZTypedocTypeKind } from '@zthun/works.core';
import Axios from 'axios';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ZApiPage } from './api-page';

jest.mock('axios');

describe('ZApiPage', () => {
  let pkg: string;
  let enid: string;
  let history: MemoryHistory;
  let typedoc: IZTypedoc;

  function createTestTarget() {
    return render(
      <Router history={history}>
        <Route path='/learn/:pkg/api' exact={true} component={ZApiPage} />
        <Route path='/learn/:pkg/api/:enid' exact={true} component={ZApiPage} />
      </Router>
    );
  }

  beforeEach(() => {
    pkg = 'works.core';
    enid = '12';

    typedoc = {
      name: '@zthun/works.core',
      children: [
        {
          id: 11,
          name: 'ZBinaryOperator',
          kind: ZTypedocKind.Enum
        },
        {
          id: 12,
          name: 'ZSampleClass',
          kind: ZTypedocKind.Class,
          children: [
            {
              id: 158,
              name: 'operator',
              kind: 1024,
              kindString: 'Property',
              flags: {
                isPublic: true
              },
              type: {
                type: ZTypedocTypeKind.Reference,
                id: 11,
                name: 'ZBinaryOperator'
              },
              defaultValue: 'true'
            }
          ],
          groups: [
            {
              title: 'Properties',
              kind: ZTypedocKind.Property,
              children: [158]
            }
          ]
        }
      ],
      groups: [
        {
          title: 'Enumerations',
          kind: ZTypedocKind.Enum,
          children: [11]
        },
        {
          title: 'Classes',
          kind: ZTypedocKind.Class,
          children: [12]
        }
      ]
    };

    (Axios.get as jest.Mock).mockResolvedValue({ data: typedoc });
  });

  afterEach(() => {
    (Axios.get as jest.Mock).mockClear();
  });

  describe('Typedoc', () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [`/learn/${pkg}/api`] });
    });

    it('renders the globals.', async () => {
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

    it('navigates to an entity when the entity is clicked.', async () => {
      // Arrange
      const expected = typedoc.children[0].id;
      // Act
      await act(async () => {
        const target = createTestTarget();
        const btn = await target.findByTestId(`ZTypedocViewer-entity-${expected}`);
        fireEvent.click(btn);
      });
      // Assert
      expect(history.location.pathname).toEqual(`/learn/${pkg}/api/${expected}`);
    });
  });

  describe('Entity', () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [`/learn/${pkg}/api/${enid}`] });
    });

    it('renders the entity.', async () => {
      // Arrange
      const expected = 'ZTypedocEntityViewer-root';
      let actual: HTMLElement = null;
      // Act
      await act(async () => {
        const target = createTestTarget();
        actual = await target.findByTestId(expected);
      });
      // Assert
      expect(actual).toBeTruthy();
    });

    it('navigates to the id that was clicked in the entity viewer.', async () => {
      // Arrange
      const expected = 11;
      // Act
      await act(async () => {
        const target = createTestTarget();
        const link = await target.findByText('ZBinaryOperator');
        fireEvent.click(link);
      });
      // Assert
      expect(history.location.pathname).toEqual(`/learn/${pkg}/api/${expected}`);
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

    it('navigates back to the api page when the api button is clicked.', async () => {
      // Arrange
      // Act
      await act(async () => {
        const target = createTestTarget();
        const btn = await target.findByTestId('ZApiPage-btn-api');
        fireEvent.click(btn);
      });
      // Assert
      expect(history.location.pathname).toEqual(`/learn/${pkg}/api`);
    });
  });
});
