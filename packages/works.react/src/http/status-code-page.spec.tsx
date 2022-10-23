/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { ZHttpCode, ZHttpCodeClient } from '@zthun/works.http';
import { createMemoryHistory } from 'history';
import React from 'react';
import { ZRoute, ZRouteMap, ZTestRouter } from '../router/router-dom';
import { ZStatusCodePage } from './status-code-page';

describe('ZStatusCodePage', () => {
  let code: number;
  let name: string;

  async function createTestTarget() {
    const history = createMemoryHistory({ initialEntries: [`/${code}`] });

    const target = render(
      <ZTestRouter location={history.location} navigator={history}>
        <ZRouteMap>
          <ZRoute path='/:code' element={<ZStatusCodePage name={name} />} />
        </ZRouteMap>
      </ZTestRouter>
    );

    await waitFor(() => expect(target.container.querySelector('.ZStatusCodePage-root')).toBeTruthy());

    return target;
  }

  beforeEach(() => {
    code = 404;
    name = 'code';
  });

  async function assertRendersPageWithCorrectCode(expected: ZHttpCode) {
    // Arrange
    code = expected;
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelector(`.ZHttpStatusCodeCard-code-${code}`);
    // Assert
    expect(actual).not.toBeNull();
  }

  it('should render the page with the given code.', async () => {
    await assertRendersPageWithCorrectCode(ZHttpCodeClient.NotFound);
  });

  it('should render the page with 417 for a parameter that does not exist', async () => {
    name = 'not-the-code';
    await assertRendersPageWithCorrectCode(ZHttpCodeClient.ImATeapot);
  });
});
