import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IZErrorHandler } from '../handler/error-handler';
import { ZErrorPassThrough } from './error-pass-through';

describe('ZErrorPassThrough', () => {
  let handler: Mocked<IZErrorHandler>;

  function createTestTarget() {
    return new ZErrorPassThrough(handler);
  }

  beforeEach(() => {
    handler = mock<IZErrorHandler>();
    handler.handle.mockResolvedValue();
  });

  it('should handle the error.', async () => {
    // Arrange
    const target = createTestTarget();
    const expected = 'failed';
    // Act
    await target.pass(expected).catch(() => Promise.resolve('ok, back to resolved'));
    // Assert
    expect(handler.handle).toHaveBeenCalledWith(expected);
  });

  it('should return a rejected promise with th error.', async () => {
    // Arrange
    const target = createTestTarget();
    const expected = 'failed';
    // Act
    // Assert
    expect(target.pass(expected)).rejects.toEqual(expected);
  });
});
