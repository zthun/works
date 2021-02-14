/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { IZTypedocType, ZTypedocTypeKind } from '@zthun/works.core';
import React from 'react';
import { ZTypedocTypeListViewer } from './typedoc-type-list-viewer';

describe('ZTypedocTypeListViewer', () => {
  let types: IZTypedocType[];
  let container: boolean;

  function createTestTarget() {
    return render(<ZTypedocTypeListViewer types={types} prefix='[' suffix=']' separator=';' container={container} />);
  }

  beforeEach(() => {
    container = true;
  });

  describe('Falsy', () => {
    it('should render nothing.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.queryByTestId('ZTypedocTypeListViewer-root');
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('Empty', () => {
    beforeEach(() => {
      types = [];
    });

    it('should render nothing.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.queryByTestId('ZTypedocTypeListViewer-root');
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('Multiple types', () => {
    beforeEach(() => {
      types = [
        {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'string'
        },
        {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'number'
        },
        {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'boolean'
        }
      ];
    });

    it('should render the list.', () => {
      // Arrange
      const target = createTestTarget();
      const expected = '[string;number;boolean]';
      // Act
      const root = target.getByTestId('ZTypedocTypeListViewer-root');
      const actual = root.textContent;
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Inline', () => {
    beforeEach(() => {
      types = [
        {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'string'
        }
      ];
      container = false;
    });

    it('should render the text without the container.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.queryByTestId('ZTypedocTypeListViewer-root');
      // Assert
      expect(actual).toBeFalsy();
    });

    it('should still render the list.', () => {
      // Arrange
      const target = createTestTarget();
      const expected = '[string]';
      // Act
      const actual = target.container.textContent;
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
