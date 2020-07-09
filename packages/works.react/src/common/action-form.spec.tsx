import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZActionForm } from './action-form';

describe('ZActionForm', () => {
  let loading: boolean;
  let disabled: boolean;
  let onAction: jest.Mock;

  async function createTestTarget() {
    return render(<ZActionForm headerText='ZActionForm Test' actionText='Run' data-testid='ZActionForm-test' loading={loading} disabled={disabled} onAction={onAction} />);
  }

  beforeEach(() => {
    loading = false;
    disabled = false;

    onAction = jest.fn();
  });

  describe('Run Action', () => {
    it('should raise the onAction event.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const form = target.getByTestId('ZActionForm-form');
      fireEvent.submit(form);
      // Assert
      expect(onAction).toHaveBeenCalled();
    });
  });

  describe('Disabled', () => {
    it('should disable the button.', async () => {
      // Arrange
      disabled = true;
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZActionForm-btn-action') as HTMLButtonElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should not disable the button on false.', async () => {
      // Arrange
      disabled = false;
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZActionForm-btn-action') as HTMLButtonElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('Loading', () => {
    it('shows the spinner if the loading flag is true.', async () => {
      // Arrange
      loading = true;
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZActionForm-progress-loading');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('does not show the spinner if the loading flag is false.', async () => {
      // Arrange
      loading = false;
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId('ZActionForm-progress-loading');
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
