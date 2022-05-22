/* eslint-disable require-jsdoc */
import { act, renderHook } from '@testing-library/react';
import { useSafeState } from './use-safe-state';

describe('useSafeState', () => {
  function createTestTarget() {
    return renderHook(() => useSafeState(true));
  }

  it('should set the state if the component is still mounted.', async () => {
    // Arrange
    const target = createTestTarget();
    const [, setter] = target.result.current;
    // Act
    await act(async () => setter(false));
    const [actual] = target.result.current;
    // Assert
    expect(actual).toBeFalsy();
  });

  it('should not set any states when the component is unmounted.', () => {
    // Arrange
    const target = createTestTarget();
    const [, setter] = target.result.current;
    // Act
    target.unmount();
    setter(false);
    const [actual] = target.result.current;
    // Assert
    expect(actual).toBeTruthy();
  });
});
