/* eslint-disable require-jsdoc */

import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import { createMocked } from '@zthun/works.jest';
import { noop } from 'lodash';
import React from 'react';
import { ZHealthIndicator } from './health-indicator';
import { ZHealthIndicatorComponentModel } from './health-indicator.cm';
import { IZHealthService, ZHealthServiceContext } from './health-service.context';

describe('ZHealthIndicator', () => {
  const performer = new ZCircusPerformer();
  const waiter = new ZCircusWait();

  let health: jest.Mocked<IZHealthService>;

  async function createTestTarget() {
    const element = (
      <ZHealthServiceContext.Provider value={health}>
        <ZHealthIndicator />
      </ZHealthServiceContext.Provider>
    );

    const result = await new ZCircusSetupRender(element).setup();
    await waiter.wait(() => !!ZHealthIndicatorComponentModel.find(result.container).length);
    const [target] = ZHealthIndicatorComponentModel.find(result.container);
    return new ZHealthIndicatorComponentModel(target, performer, waiter);
  }

  beforeEach(() => {
    health = createMocked(['read']);
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
