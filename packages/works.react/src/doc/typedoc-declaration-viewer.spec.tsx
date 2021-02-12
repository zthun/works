/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { IZTypedocEntity, ZTypedocKind } from '@zthun/works.core';
import React from 'react';
import { ZTypedocDeclarationViewer } from './typedoc-declaration-viewer';

describe('ZTypedocDeclarationViewer', () => {
  let declaration: IZTypedocEntity;

  function createTestTarget() {
    return render(<ZTypedocDeclarationViewer declaration={declaration} />);
  }

  beforeEach(() => {
    declaration = {
      id: 1001,
      kind: ZTypedocKind.Class,
      name: 'FooClass'
    };
  });

  it('should render.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZTypedocDeclarationViewer-root');
    // Assert
    expect(actual).toBeDefined();
  });
});
