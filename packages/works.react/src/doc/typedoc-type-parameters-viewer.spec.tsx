/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { IZTypedocEntity, ZTypedocKind, ZTypedocTypeKind } from '@zthun/works.core';
import { noop } from 'lodash';
import React from 'react';
import { ZTypedocTypeParametersViewer } from './typedoc-type-parameters-viewer';

describe('ZTypedocTypeParametersViewer', () => {
  let types: IZTypedocEntity[];

  function createTestTarget() {
    return render(<ZTypedocTypeParametersViewer types={types} onEntity={noop} />);
  }

  describe('Falsy', () => {
    it('should not render anything.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.queryByTestId('ZTypedocTypeParameterViewer-root');
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('Empty', () => {
    beforeEach(() => {
      types = [];
    });

    it('should not render anything.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.queryByTestId('ZTypedocTypeParameterViewer-root');
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('Multiple parameters', () => {
    beforeEach(() => {
      types = [
        {
          id: 14,
          name: 'T',
          kind: ZTypedocKind.TypeParameter
        },
        {
          id: 15,
          name: 'T2',
          kind: ZTypedocKind.TypeParameter,
          type: {
            type: ZTypedocTypeKind.Reference,
            name: 'Error'
          }
        },
        {
          id: 16,
          name: 'T3',
          kind: ZTypedocKind.TypeParameter
        }
      ];
    });

    it('should render the parameters', () => {
      // Arrange
      const target = createTestTarget();
      const expected = '<T, T2 extends Error, T3>';
      // Act
      const actual = target.getByTestId('ZTypedocTypeParametersViewer-root').textContent;
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
