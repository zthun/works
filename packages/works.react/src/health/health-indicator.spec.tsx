import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { noop } from 'lodash';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZHealthIndicator } from './health-indicator';
import { ZHealthIndicatorComponentModel } from './health-indicator.cm';
import { IZHealthService, ZHealthServiceContext } from './health-service';

describe('ZHealthIndicator', () => {
  let health: Mocked<IZHealthService>;

  async function createTestTarget() {
    const element = (
      <ZHealthServiceContext.Provider value={health}>
        <ZHealthIndicator />
      </ZHealthServiceContext.Provider>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZHealthIndicatorComponentModel);
  }

  beforeEach(() => {
    health = mock();
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
