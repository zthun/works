/* eslint-disable require-jsdoc */
import { required } from './obligation';

describe('Obligation', () => {
  describe('Required', () => {
    it('should return a rejected promise if the value is null', async () => {
      await expect(required(null)).rejects.toBeTruthy();
    });

    it('should return a rejected promise if the value is undefined', async () => {
      await expect(required(undefined)).rejects.toBeTruthy();
    });

    it('should return a rejected promise if a promise resolves to undefined', async () => {
      await expect(required(Promise.resolve())).rejects.toBeTruthy();
    });

    it('should return a rejected promise if a promise resolves to null', async () => {
      await expect(required(Promise.resolve(null))).rejects.toBeTruthy();
    });

    it('should return a rejected promise if a promise rejects', async () => {
      await expect(required(Promise.reject(new Error('Something went wrong elsewhere')))).rejects.toBeTruthy();
    });

    it('should resolve with a truthy value', async () => {
      const expected = 'Value is set';
      await expect(required(expected)).resolves.toEqual(expected);
    });

    it('should resolve with a value of 0', async () => {
      await expect(required(0)).resolves.toEqual(0);
    });

    it('should resolve with a value of the empty string', async () => {
      await expect(required('')).resolves.toEqual('');
    });

    it('should resolve with a value of false', async () => {
      await expect(required(false)).resolves.toEqual(false);
    });

    it('should resolve with a truthy promise', async () => {
      await expect(required(Promise.resolve(true))).resolves.toEqual(true);
    });
  });
});
