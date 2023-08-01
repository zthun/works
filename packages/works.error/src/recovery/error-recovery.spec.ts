import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IZErrorHandler } from '../handler/error-handler';
import { ZErrorRecovery } from './error-recovery';

describe('ZErrorRecovery', () => {
  let handler: Mocked<IZErrorHandler>;

  function createTestTarget() {
    return new ZErrorRecovery(handler);
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
    await target.recover(expected, 'success');
    // Assert
    expect(handler.handle).toHaveBeenCalledWith(expected);
  });

  it('should return the recovery value.', async () => {
    // Arrange
    const target = createTestTarget();
    const expected = 'success';
    // Act
    const actual = await target.recover('failed', expected);
    // Assert
    expect(actual).toEqual(expected);
  });
});
