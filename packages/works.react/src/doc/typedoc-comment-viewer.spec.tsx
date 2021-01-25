/* eslint-disable require-jsdoc */

import { render } from '@testing-library/react';
import { IZTypedocComment } from '@zthun/works.core';
import React from 'react';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';

describe('ZTypedocCommentViewer', () => {
  let comment: IZTypedocComment;

  function createTestTarget() {
    return render(<ZTypedocCommentViewer comment={comment} />);
  }

  beforeEach(() => {
    comment = {
      shortText: 'Short text',
      text: 'This is longer text that is under the short text.',
      returns: 'The return value',
      tags: []
    };
  });

  function assertRendersSection(section: string) {
    // Arrange
    const query = `.ZTypedocCommentViewer-${section}`;
    const target = createTestTarget();
    // Act
    const actual = target.container.querySelector(query);
    // Assert
    expect(actual).toBeTruthy();
  }

  describe('Short text', () => {
    it('should render', () => {
      assertRendersSection('short');
    });
  });

  describe('Full text', () => {
    it('should render', () => {
      assertRendersSection('text');
    });
  });

  describe('Returns', () => {
    it('should render', () => {
      assertRendersSection('returns');
    });
  });

  describe('Falsy', () => {
    beforeEach(() => {
      comment = null;
    });

    it('should render nothing if the comment is falsy.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.container.hasChildNodes();
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('Empty', () => {
    beforeEach(() => {
      comment = {};
    });

    it('should render an empty comment if the comment is empty.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.getByTestId('ZTypedocCommentViewer-root').hasChildNodes();
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
