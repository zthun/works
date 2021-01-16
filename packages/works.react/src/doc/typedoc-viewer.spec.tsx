/* eslint-disable require-jsdoc */
import { fireEvent, render } from '@testing-library/react';
import { IZTypedoc, ZTypedocKind } from '@zthun/works.core';
import React from 'react';
import { ZTypedocViewer } from './typedoc-viewer';

describe('ZTypedocViewer', () => {
  let typedoc: IZTypedoc;
  let onEntity: jest.Mock;

  function createTestTarget() {
    return render(<ZTypedocViewer typedoc={typedoc} onEntity={onEntity} />);
  }

  beforeEach(() => {
    typedoc = {
      name: '@zthun/works.core',
      children: [
        {
          id: 10,
          name: 'ClassA',
          kind: ZTypedocKind.Class,
          kindString: 'Class'
        },
        {
          id: 11,
          name: 'ClassB',
          kind: ZTypedocKind.Class,
          kindString: 'Class'
        }
      ],
      groups: [
        {
          title: 'Classes',
          kind: ZTypedocKind.Class,
          children: [10, 11]
        }
      ]
    };

    onEntity = jest.fn();
  });

  it('should render the groups.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZTypedocViewer-group-classes');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should render the entities.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actualA = target.getByTestId(`ZTypedocViewer-entity-${typedoc.children[0].id}`);
    const actualB = target.getByTestId(`ZTypedocViewer-entity-${typedoc.children[1].id}`);
    // Assert
    expect(actualA && actualB).toBeTruthy();
  });

  it('should invoke the onEntity method when an entity is clicked.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const entity = target.getByTestId(`ZTypedocViewer-entity-${typedoc.children[0].id}`);
    fireEvent.click(entity);
    // Assert
    expect(onEntity).toHaveBeenCalledWith(typedoc.children[0]);
  });
});
