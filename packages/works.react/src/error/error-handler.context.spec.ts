/* eslint-disable require-jsdoc */
import { renderHook } from '@testing-library/react-hooks';
import { useErrorHandler } from './error-handler.context';

describe('useErrorHandler', () => {
  function createTestTarget() {
    return renderHook(() => useErrorHandler());
  }

  it('should return the default implementation.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.result.current;
    // Assert
    expect(actual).toBeTruthy();
  });
});
