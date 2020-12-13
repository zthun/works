/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { ZTypedocViewer } from './typedoc-viewer';

describe('ZTypedocViewer', () => {
  function createTestTarget() {
    return render(<ZTypedocViewer src='doc/works.typedoc.json' />);
  }

  it('should render the component.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.findByTestId('ZTypedocViewer-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
