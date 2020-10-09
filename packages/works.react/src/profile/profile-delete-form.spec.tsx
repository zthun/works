/* eslint-disable require-jsdoc */

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZProfileDeleteForm } from './profile-delete-form';

describe('ZProfileDeactivationForm', () => {
  let onDelete: jest.Mock;

  async function createTestTarget() {
    return render(<ZProfileDeleteForm onDelete={onDelete} />);
  }

  beforeEach(() => {
    onDelete = jest.fn();
  });

  describe('Delete', () => {
    it('invokes the delete event.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      await act(async () => {
        const form = target.getByTestId('ZActionForm-form');
        fireEvent.submit(form);
      });
      const yes = target.getByTestId('ZActionForm-btn-yes');
      fireEvent.submit(yes);
      // Assert
      expect(onDelete).toHaveBeenCalled();
    });
  });
});
