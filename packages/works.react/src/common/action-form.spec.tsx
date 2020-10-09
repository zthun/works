/* eslint-disable require-jsdoc */

import { Typography } from '@material-ui/core';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZActionForm } from './action-form';

describe('ZActionForm', () => {
  let loading: boolean;
  let disabled: boolean;
  let confirmation: React.ReactNode;
  let onAction: jest.Mock;

  async function createTestTarget() {
    return render(<ZActionForm headerText='ZActionForm Test' actionText='Run' data-testid='ZActionForm-test' loading={loading} disabled={disabled} confirmation={confirmation} onAction={onAction} />);
  }

  beforeEach(() => {
    loading = false;
    disabled = false;
    confirmation = null;

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
      expect(onAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Confirm Action', () => {
    beforeEach(() => {
      confirmation = <Typography>Confirm?</Typography>;
    });

    it('should raise the onAction event after the user clicks the Accept button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      act(() => {
        const form = target.getByTestId('ZActionForm-form');
        fireEvent.submit(form);
      });
      const yes = target.getByTestId('ZActionForm-btn-yes');
      fireEvent.submit(yes);
      // Assert
      expect(onAction).toHaveBeenCalled();
    });

    it('should not raise the onAction event after the user clicks the Decline button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      act(() => {
        const form = target.getByTestId('ZActionForm-form');
        fireEvent.submit(form);
      });
      const no = target.getByTestId('ZActionForm-btn-no');
      fireEvent.click(no);
      // Assert
      expect(onAction).not.toHaveBeenCalled();
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
