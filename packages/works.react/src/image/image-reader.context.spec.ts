/* eslint-disable require-jsdoc */
import { renderHook } from '@testing-library/react-hooks';
import { useImageReader } from './image-reader.context';

describe('useImageReader', () => {
  function createTestTarget() {
    return renderHook(() => useImageReader());
  }

  it('should return the default image reader implementation.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.result.current;
    // Assert
    expect(actual).toBeTruthy();
  });
});
