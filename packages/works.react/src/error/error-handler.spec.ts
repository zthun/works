/* eslint-disable require-jsdoc */
import { ZCircusSetupHook } from '@zthun/cirque-du-react';
import { ZErrorHandler } from '@zthun/works.error';
import { useErrorHandler } from './error-handler';

describe('useErrorHandler', () => {
  async function createTestTarget() {
    return await new ZCircusSetupHook(() => useErrorHandler()).setup();
  }

  it('should return the default implementation.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = await target.current();
    // Assert
    expect(actual).toBeInstanceOf(ZErrorHandler);
  });
});
