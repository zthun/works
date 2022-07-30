/* eslint-disable require-jsdoc */
import { renderHook, RenderHookResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { usePropState } from './use-prop-state';

describe('usePropState', () => {
  let current: string | undefined;
  let setCurrent: ((val: string) => void) | undefined;

  function createTestTarget() {
    return renderHook(() => usePropState(current, setCurrent));
  }

  beforeEach(() => {
    current = undefined;
    setCurrent = undefined;
  });

  async function setValueAndRerender(expected: string, target: RenderHookResult<[string | undefined, (val: string) => void], any>) {
    const [, setVal] = target.result.current;

    await act(async () => {
      setVal(expected);
      target.rerender();
    });
  }

  describe('Props', () => {
    beforeEach(() => {
      current = 'by-props';
      setCurrent = _setCurrent;
    });

    function _setCurrent(val: string) {
      current = val;
    }

    it('should return the prop value.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const [val] = target.result.current;
      // Assert
      expect(val).toEqual(current);
    });

    it('should set the prop value.', async () => {
      // Arrange.
      const target = createTestTarget();
      const expected = 'value-to-set';
      // Act.
      await setValueAndRerender(expected, target);
      // Assert.
      expect(current).toEqual(expected);
    });
  });

  describe('State', () => {
    it('should set the internal state if the props are undefined.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = 'updated-value';
      // Act
      await setValueAndRerender(expected, target);
      const [actual] = target.result.current;
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
