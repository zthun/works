/* eslint-disable require-jsdoc */
import { ZCircusSetupHook } from '@zthun/works.cirque-du-react';
import { ZImageReader } from '@zthun/works.draw';
import { useImageReader } from './image-reader.context';

describe('useImageReader', () => {
  function createTestTarget() {
    return new ZCircusSetupHook(() => useImageReader()).setup();
  }

  it('should return the default image reader implementation.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = await target.current();
    // Assert
    expect(actual).toBeInstanceOf(ZImageReader);
  });
});
