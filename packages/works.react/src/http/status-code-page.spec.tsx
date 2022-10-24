/* eslint-disable require-jsdoc */
import { IZCircusDriver, ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import {
  getHttpCodeCategory,
  getHttpCodeDescription,
  ZHttpCode,
  ZHttpCodeClient,
  ZHttpCodeInformationalResponse,
  ZHttpCodeRedirection,
  ZHttpCodeServer,
  ZHttpCodeSuccess
} from '@zthun/works.http';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { ZRoute, ZRouteMap, ZTestRouter } from '../router/router-dom';
import { ZStatusCodePage } from './status-code-page';
import { ZStatusCodePageComponentModel } from './status-code-page.cm';

describe('ZStatusCodePage', () => {
  let _driver: IZCircusDriver;
  let history: MemoryHistory;
  let name: string | undefined;

  async function createTestTarget() {
    const path = name ?? 'code';
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZRouteMap>
          <ZRoute path={`/:${path}`} element={<ZStatusCodePage name={name} />} />
        </ZRouteMap>
      </ZTestRouter>
    );

    _driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(_driver, ZStatusCodePageComponentModel, ZStatusCodePageComponentModel.Selector);
  }

  beforeEach(() => {
    name = undefined;
  });

  afterEach(async () => {
    await _driver?.destroy();
  });

  async function assertRendersPageWithCorrectCode(code: ZHttpCode) {
    // Arrange
    history = createMemoryHistory({ initialEntries: [`/${code}`] });
    const description = getHttpCodeDescription(code);
    const category = getHttpCodeCategory(code);
    const target = await createTestTarget();
    // Act
    const actualCode = await target.code();
    const actualCategory = await target.category();
    const actualDescription = await target.description();
    // Assert
    expect(actualCode).toEqual(code);
    expect(actualCategory).toEqual(category);
    expect(actualDescription).toEqual(description);
  }

  it('should render the page with an info code', async () => {
    await assertRendersPageWithCorrectCode(ZHttpCodeInformationalResponse.EarlyHints);
  });

  it('should render the page with a success code', async () => {
    await assertRendersPageWithCorrectCode(ZHttpCodeSuccess.NoContent);
  });

  it('should render the page with a redirection code', async () => {
    await assertRendersPageWithCorrectCode(ZHttpCodeRedirection.MultipleChoices);
  });

  it('should render the page with a client code.', async () => {
    await assertRendersPageWithCorrectCode(ZHttpCodeClient.NotFound);
  });

  it('should render the page with a server code.', async () => {
    await assertRendersPageWithCorrectCode(ZHttpCodeServer.BadGateway);
  });

  it('should render the page with 418 for a non valid parameter', async () => {
    // Arrange.
    history = createMemoryHistory({ initialEntries: [`/lol-wut?`] });
    const expected = ZHttpCodeClient.ImATeapot;
    const target = await createTestTarget();
    // Act.
    const actual = await target.code();
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should render the code with a custom name', async () => {
    // Arrange
    name = 'httpStatus';
    history = createMemoryHistory({ initialEntries: ['/200'] });
    const target = await createTestTarget();
    // Act.
    const actual = await target.code();
    // Assert.
    expect(actual).toEqual(ZHttpCodeSuccess.OK);
  });
});