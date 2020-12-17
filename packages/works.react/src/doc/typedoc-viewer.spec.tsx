/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { IZTypedoc, ZTypedocKind } from '@zthun/works.core';
import React from 'react';
import { ZTypedocViewer } from './typedoc-viewer';

describe('ZTypedocViewer', () => {
  let typedoc: IZTypedoc;
  let loading: boolean;

  function createTestTarget() {
    return render(<ZTypedocViewer typedoc={typedoc} loading={loading} />);
  }

  beforeEach(() => {
    loading = false;

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
  });

  describe('Loading', () => {
    it('should show the loading spinner when the loading flag is true.', () => {
      // Arrange
      loading = true;
      const target = createTestTarget();
      // Act
      const actual = target.getByTestId('ZPaperCard-progress-loading');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should hide the loading spinner when the loading flag is false.', () => {
      // Arrange
      loading = false;
      const target = createTestTarget();
      // Act
      const actual = target.queryByTestId('ZPaperCard-progress-loading');
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('No docs', () => {
    it('should render that no docs are available.', () => {
      // Arrange
      typedoc = null;
      const target = createTestTarget();
      // Act
      const actual = target.getByTestId('ZTypedocViewer-no-entity');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Full docs', () => {
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
  });
});
