/* eslint-disable require-jsdoc */

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZSummaryCard } from './summary-card';

describe('ZSummaryCard', () => {
  let onLearnMore: jest.Mock;

  beforeEach(() => {
    onLearnMore = jest.fn();
  });

  function createTestTarget() {
    return render(
      <ZSummaryCard title='Summary test' imageUrl='/not/a/real/image.svg' onLearnMore={onLearnMore}>
        Summary text
      </ZSummaryCard>
    );
  }

  it('should render the card.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZSummaryCard-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should invoke the onLearnMore event when the learn more button is clicked.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZSummaryCard-btn-learn');
    fireEvent.click(actual);
    // Assert
    expect(onLearnMore).toHaveBeenCalledTimes(1);
  });
});
