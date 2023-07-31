/* eslint-disable require-jsdoc */
import { ZCircusSetupHook } from '@zthun/cirque-du-react';
import { createMocked } from '@zthun/spellcraft-jest';
import {
  ZHttpCodeServer,
  ZHttpCodeSuccess,
  ZHttpMethod,
  ZHttpResultBuilder,
  ZHttpServiceMock
} from '@zthun/webigail-http';
import React from 'react';
import { IZHealthService, ZHealthService, ZHealthServiceContext, useHealth } from './health-service';

describe('ZHealthService', () => {
  let http: ZHttpServiceMock;

  function createTestTarget() {
    return new ZHealthService(http);
  }

  beforeEach(() => {
    http = new ZHttpServiceMock();
    http.set(
      ZHealthService.createHealthUrl(),
      ZHttpMethod.Get,
      new ZHttpResultBuilder(true).status(ZHttpCodeSuccess.OK).build()
    );
  });

  it('should return the value from the service request.', async () => {
    // Arrange.
    const target = createTestTarget();
    // Act
    const actual = await target.read();
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should return false if the endpoint is missing.', async () => {
    // Arrange
    http.set(
      ZHealthService.createHealthUrl(),
      ZHttpMethod.Get,
      new ZHttpResultBuilder(null).status(ZHttpCodeServer.BadGateway).build()
    );
    const target = createTestTarget();
    // Act
    const actual = await target.read();
    // Assert
    expect(actual).toBeFalsy();
  });
});

describe('useHealth', () => {
  let health: jest.Mocked<IZHealthService>;

  async function createTestTarget() {
    const wrapper = ({ children }) => (
      <ZHealthServiceContext.Provider value={health}>{children}</ZHealthServiceContext.Provider>
    );
    return new ZCircusSetupHook(() => useHealth(), { wrapper }).setup();
  }

  beforeEach(() => {
    health = createMocked(['read']);
    health.read.mockResolvedValue(true);
  });

  it('should return the initial value of the health upon load.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const [actual] = await target.rerender();
    // Assert
    expect(actual).toEqual(true);
  });
});
