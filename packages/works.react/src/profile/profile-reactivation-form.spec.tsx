/* eslint-disable require-jsdoc */

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZProfileReactivationForm } from './profile-reactivation-form';

describe('ZProfileActivationForm', () => {
  let onReactivate: jest.Mock;

  async function createTestTarget() {
    return render(<ZProfileReactivationForm onReactivate={onReactivate} />);
  }

  beforeEach(() => {
    onReactivate = jest.fn();
  });

  describe('Reactivate', () => {
    it('should raise the onReactivate event when the send activation code link is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const form = target.getByTestId('ZActionForm-form');
      fireEvent.submit(form);
      // Assert
      expect(onReactivate).toHaveBeenCalled();
    });
  });
});
