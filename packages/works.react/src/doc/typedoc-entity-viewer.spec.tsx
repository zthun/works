/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { IZTypedocEntity, ZTypedocKind } from '@zthun/works.core';
import React from 'react';
import { ZTypedocEntityViewer } from './typedoc-entity-viewer';

describe('ZTypedocEntityViewer', () => {
  let entity: IZTypedocEntity;

  function createTestTarget() {
    return render(<ZTypedocEntityViewer entity={entity} />);
  }

  beforeEach(() => {
    entity = {
      id: 11,
      name: 'ClassA',
      kind: ZTypedocKind.Class,
      kindString: 'Class'
    };
  });

  it('renders the component.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZTypedocEntityViewer-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
