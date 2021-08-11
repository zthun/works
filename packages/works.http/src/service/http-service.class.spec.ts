/* eslint-disable require-jsdoc */
import axios, { AxiosPromise } from 'axios';
import { ZHttpRequestBuilder } from '../request/http-request-builder.class';
import { ZHttpService } from './http-service.class';

jest.mock('axios');

describe('ZHttpService', () => {
  function createTestTarget() {
    return new ZHttpService();
  }

  it('should return a resolved result from the request.', async () => {
    // Arrange
    const expected = 'Success';
    (axios as unknown as jest.Mock<AxiosPromise<string>>).mockResolvedValue({ status: 200, statusText: 'Success', data: expected, config: {}, headers: [] });
    const target = createTestTarget();
    const req = new ZHttpRequestBuilder().get().url('https://www.zthunworks.com/api/health').build();
    // Act
    const actual = await target.request(req);
    // Assert
    expect(actual.data).toEqual(expected);
  });

  it('should return a rejected promise on failure.', async () => {
    // Arrange
    const expected = 'Failed';
    (axios as unknown as jest.Mock<AxiosPromise<string>>).mockRejectedValue({ status: 404, statusText: 'Not Found', data: expected, config: {}, headers: [] });
    const target = createTestTarget();
    const req = new ZHttpRequestBuilder().delete().url('https://www.zthunworks.com/api/').build();
    // Act
    const actual = await target.request(req).catch((err) => err.data);
    // Assert
    expect(actual).toEqual(expected);
  });
});
