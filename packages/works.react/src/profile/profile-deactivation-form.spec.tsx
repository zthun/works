import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZProfileDeactivationForm } from './profile-deactivation-form';

describe('ZProfileDeactivationForm', () => {
  let onDeactivate: jest.Mock;

  async function createTestTarget() {
    return render(<ZProfileDeactivationForm onDeactivate={onDeactivate} />);
  }

  beforeEach(() => {
    onDeactivate = jest.fn();
  });

  describe('Deactivate', () => {
    it('invokes the deactivate event.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZActionForm-btn-action') as HTMLButtonElement;
      fireEvent.click(btn);
      // Assert
      expect(onDeactivate).toHaveBeenCalled();
    });
  });
});
