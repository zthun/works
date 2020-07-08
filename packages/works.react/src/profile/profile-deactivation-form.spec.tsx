import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZProfileDeactivationForm } from './profile-deactivation-form';

describe('ZProfileDeactivationForm', () => {
  let disabled: boolean;
  let loading: boolean;
  let onDeactivate: jest.Mock;

  async function createTestTarget() {
    return render(<ZProfileDeactivationForm disabled={disabled} loading={loading} onDeactivate={onDeactivate} />);
  }

  beforeEach(() => {
    disabled = false;
    loading = false;
    onDeactivate = jest.fn();
  });

  it('can render the component.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZProfileDeactivationForm-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Deactivate', () => {
    it('invokes the deactivate event.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZProfileDeactivationForm-btn-deactivate') as HTMLButtonElement;
      fireEvent.click(btn);
      // Assert
      expect(onDeactivate).toHaveBeenCalled();
    });
  });

  describe('Disabled', () => {
    it('disables the deactivate button.', async () => {
      // Arrange
      disabled = true;
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZProfileDeactivationForm-btn-deactivate') as HTMLButtonElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Loading', () => {
    it('shows the spinner if the loading flag is true.', async () => {
      // Arrange
      loading = true;
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZProfileDeactivationForm-progress-loading');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('does not show the spinner if the loading flag is false.', async () => {
      // Arrange
      loading = false;
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId('ZProfileDeactivationForm-progress-loading');
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
