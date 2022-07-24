/* eslint-disable require-jsdoc */
import axios, { AxiosError, AxiosPromise } from 'axios';
import { IZHttpRequest, ZHttpRequestBuilder } from '../request/http-request';
import { ZHttpService } from './http-service';

jest.mock('axios');

describe('ZHttpService', () => {
  function createTestTarget() {
    return new ZHttpService();
  }

  describe('Success', () => {
    it('should return a resolved result from the request.', async () => {
      // Arrange
      const expected = 'Success';
      (axios as unknown as jest.Mock<AxiosPromise<string>>).mockResolvedValue({ status: 200, statusText: 'Success', data: expected, config: {}, headers: {} });
      const target = createTestTarget();
      const req = new ZHttpRequestBuilder().get().url('https://www.zthunworks.com/api/health').build();
      // Act
      const actual = await target.request(req);
      // Assert
      expect(actual.data).toEqual(expected);
    });
  });

  describe('Error', () => {
    let error: AxiosError;
    let data: string;
    let message: string;
    let req: IZHttpRequest;

    beforeEach(() => {
      req = new ZHttpRequestBuilder().delete().url('https://www.zthunworks.com/api/').build();

      data = 'Error data';
      message = 'Failed';

      error = {
        name: 'Error',
        config: {},
        response: {
          data,
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: {}
        },
        request: {},
        message,
        isAxiosError: true,
        toJSON: jest.fn()
      };
    });

    it('should return a rejected promise on failure.', async () => {
      // Arrange
      (axios as unknown as jest.Mock<AxiosPromise<string>>).mockRejectedValue(error);
      const target = createTestTarget();
      // Act
      const actual = await target.request(req).catch((err) => err.data);
      // Assert
      expect(actual).toEqual(data);
    });

    it('should return a rejected promise if the request was made but the endpoint cannot be hit.', async () => {
      // Arrange
      delete error.response;
      (axios as unknown as jest.Mock<AxiosPromise<string>>).mockRejectedValue(error);
      const target = createTestTarget();
      // Act
      const actual = await target.request(req).catch((err) => err.data);
      // Assert
      expect(actual).toContain('endpoint could not be reached');
    });

    it('should return a rejected promise if the request cannot be made at all.', async () => {
      // Arrange
      delete error.request;
      delete error.response;
      (axios as unknown as jest.Mock<AxiosPromise<string>>).mockRejectedValue(error);
      const target = createTestTarget();
      // Act
      const actual = await target.request(req).catch((err) => err.data);
      // Assert
      expect(actual).toEqual(message);
    });

    it('should return a rejected promise with a generic message if something else goes wrong.', async () => {
      (axios as unknown as jest.Mock<AxiosPromise<string>>).mockRejectedValue({});
      const target = createTestTarget();
      // Act
      const actual = await target.request(req).catch((err) => err.data);
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
