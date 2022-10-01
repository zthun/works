/* eslint-disable require-jsdoc */
import { renderHook, waitFor } from '@testing-library/react';
import {
  ZHttpCodeServer,
  ZHttpCodeSuccess,
  ZHttpMethod,
  ZHttpResultBuilder,
  ZHttpServiceMock
} from '@zthun/works.http';
import { createMocked } from '@zthun/works.jest';
import React from 'react';
import { IZHealthService, useHealth, ZHealthService, ZHealthServiceContext } from './health-service.context';

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
    const target = renderHook(() => useHealth(), { wrapper });
    return target;
  }

  beforeEach(() => {
    health = createMocked(['read']);
    health.read.mockResolvedValue(true);
  });

  it('should return the initial value of the health upon load.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    await waitFor(() => {
      const [actual] = target.result.current;
      // Assert
      expect(actual).toEqual(true);
    });
  });
});
