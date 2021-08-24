/* eslint-disable require-jsdoc */
import { createMocked } from '@zthun/works.jest';
import { IZErrorHandler } from '../handler/error-handler';
import { ZErrorRecovery } from './error-recovery';

describe('ZErrorRecovery', () => {
  let handler: IZErrorHandler;

  function createTestTarget() {
    return new ZErrorRecovery(handler);
  }

  beforeEach(() => {
    handler = createMocked<IZErrorHandler>(['handle']);
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
