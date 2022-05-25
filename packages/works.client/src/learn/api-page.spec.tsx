/* eslint-disable require-jsdoc */

import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { IZTypedoc, IZTypedocEntity, ZTypedocKind, ZTypedocTypeKind } from '@zthun/works.core';
import { ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZHttpServiceContext, ZRoute, ZRouteMap, ZTestRouter } from '@zthun/works.react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { ZApiPage } from './api-page';

describe('ZApiPage', () => {
  let pkg: string;
  let enid: string;
  let history: MemoryHistory;
  let typedoc: IZTypedoc;
  let http: ZHttpServiceMock;

  async function createTestTarget() {
    const target = render(
      <ZHttpServiceContext.Provider value={http}>
        <ZTestRouter location={history.location} navigator={history}>
          <ZRouteMap>
            <ZRoute path='/learn/:pkg/api' element={<ZApiPage />}>
              <ZRoute path=':enid' element={<ZApiPage />} />
            </ZRoute>
          </ZRouteMap>
        </ZTestRouter>
      </ZHttpServiceContext.Provider>
    );

    await waitFor(() => expect(target.container.querySelector('.ZApiPage-root')).toBeTruthy());
    await waitFor(() => expect(target.container.querySelector('.ZCircularProgress-root')).toBeFalsy());

    return target;
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

    const src = `docs/${pkg}.typedoc.json`;
    http = new ZHttpServiceMock();
    http.set(src, ZHttpMethod.Get, new ZHttpResultBuilder().data(typedoc).build());
  });

  async function clickBackToButton(target: RenderResult) {
    const btn = target.container.querySelector<HTMLButtonElement>('.ZPaperCard-btn-action');
    await act(async () => {
      fireEvent.click(btn);
    });
  }

  describe('Without entity', () => {
    async function clickLink(entity: IZTypedocEntity, target: RenderResult) {
      const { id } = entity;
      const testId = `ZTypedocViewer-entity-${id}`;
      const link = target.getByTestId(testId);
      await act(async () => {
        fireEvent.click(link);
      });
    }

    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [`/learn/${pkg}/api`] });
    });

    it('navigates back to the learn page when the learn button is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      await clickBackToButton(target);
      // Assert
      expect(history.location.pathname).toEqual(`/learn/${pkg}`);
    });

    it('navigates to an entity when the entity is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const [entity] = typedoc.children;
      await clickLink(entity, target);
      // Assert
      expect(history.location.pathname).toEqual(`/learn/${pkg}/api/${entity.id}`);
    });
  });

  describe('With entity', () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [`/learn/${pkg}/api/${enid}`] });
    });

    it('navigates to the id that was clicked in the entity viewer.', async () => {
      // Arrange
      const expected = 11;
      const target = await createTestTarget();
      // Act
      await act(async () => {
        const [link] = await target.findAllByText('ZBinaryOperator');
        fireEvent.click(link);
      });
      // Assert
      expect(history.location.pathname).toEqual(`/learn/${pkg}/api/${expected}`);
    });

    it('navigates back to the api page when the action button is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      await clickBackToButton(target);
      // Assert
      expect(history.location.pathname).toEqual(`/learn/${pkg}/api`);
    });
  });
});
