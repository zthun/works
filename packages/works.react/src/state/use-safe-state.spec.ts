/* eslint-disable require-jsdoc */
import { ZCircusSetupHook } from '@zthun/cirque-du-react';
import { useSafeState } from './use-safe-state';

describe('useSafeState', () => {
  async function createTestTarget() {
    return await new ZCircusSetupHook(() => useSafeState(true)).setup();
  }

  it('should set the state if the component is still mounted.', async () => {
    // Arrange
    const target = await createTestTarget();
    const [, setter] = await target.current();
    // Act
    setter(false);
    const [actual] = await target.rerender();
    // Assert
    expect(actual).toBeFalsy();
  });

  it('should not set any states when the component is unmounted.', async () => {
    // Arrange
    const target = await createTestTarget();
    const [, setter] = await target.current();
    // Act
    await target.destroy();
    setter(false);
    const [actual] = await target.current();
    // Assert
    expect(actual).toBeTruthy();
  });
});
