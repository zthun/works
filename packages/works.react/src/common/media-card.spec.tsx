/* eslint-disable require-jsdoc */

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZMediaCard } from './media-card';

describe('ZSummaryCard', () => {
  let onAction: jest.Mock;

  beforeEach(() => {
    onAction = jest.fn();
  });

  function createTestTarget() {
    return render(<ZMediaCard headerText='Summary test' imageUrl='/not/a/real/image.svg' onAction={onAction} />);
  }

  it('should render the card.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZMediaCard-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should invoke the onLearnMore event when the learn more button is clicked.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZMediaCard-btn-action');
    fireEvent.click(actual);
    // Assert
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
