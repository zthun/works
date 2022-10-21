/* eslint-disable require-jsdoc */

import { IZCircusDriver } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { createMocked } from '@zthun/works.jest';
import { noop } from 'lodash';
import React from 'react';
import { ZHealthIndicator } from './health-indicator';
import { ZHealthIndicatorComponentModel } from './health-indicator.cm';
import { IZHealthService, ZHealthServiceContext } from './health-service.context';

describe('ZHealthIndicator', () => {
  let _driver: IZCircusDriver;
  let health: jest.Mocked<IZHealthService>;

  async function createTestTarget() {
    const element = (
      <ZHealthServiceContext.Provider value={health}>
        <ZHealthIndicator />
      </ZHealthServiceContext.Provider>
    );

    _driver = await new ZCircusSetupRenderer(element).setup();
    await _driver.wait(() => _driver.peek(ZHealthIndicatorComponentModel.Selector));
    const target = await _driver.select(ZHealthIndicatorComponentModel.Selector);
    return new ZHealthIndicatorComponentModel(target);
  }

  beforeEach(() => {
    health = createMocked(['read']);
  });

  afterEach(async () => {
    await _driver?.destroy();
  });

  it('should render a loading indicator if the health is loading.', async () => {
    // Arrange
    health.read.mockReturnValue(new Promise(noop));
    const target = await createTestTarget();
    // Act & Assert
    const actual = await target.loading();
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should render ok if the service returns true.', async () => {
    // Arrange
    health.read.mockResolvedValue(true);
    const target = await createTestTarget();
    await target.load();
    // Act.
    const actual = await target.healthy();
    // Assert.
    expect(actual).toBeTruthy();
  });

  it('should render error if the service is down.', async () => {
    // Arrange
    health.read.mockResolvedValue(false);
    const target = await createTestTarget();
    await target.load();
    // Act
    const actual = await target.unhealthy();
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should refresh the status when the indicator is clicked.', async () => {
    // Arrange
    health.read.mockResolvedValue(true);
    const target = await createTestTarget();
    await target.load();
    health.read.mockClear();
    health.read.mockResolvedValue(false);
    // Act
    await target.refresh();
    const actual = await target.healthy();
    // Assert
    expect(actual).toBeFalsy();
  });
});
