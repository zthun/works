import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZProfileReactivationForm } from './profile-reactivation-form';

describe('ZProfileActivationForm', () => {
  let disabled: boolean;
  let loading: boolean;
  let onReactivate: jest.Mock;

  async function createTestTarget() {
    return render(<ZProfileReactivationForm onReactivate={onReactivate} disabled={disabled} loading={loading} />);
  }

  beforeEach(() => {
    disabled = false;
    loading = false;
    onReactivate = jest.fn();
  });

  it('renders the form.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZProfileReactivationForm-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Reactivate', () => {
    it('should raise the onReactivate event when the send activation code link is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const field = target.getByTestId('ZProfileReactivationForm-btn-reactivate');
      fireEvent.click(field);
      // Assert
      expect(onReactivate).toHaveBeenCalled();
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      disabled = true;
    });

    it('should disable the reactivate button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const element = target.getByTestId('ZProfileReactivationForm-btn-reactivate') as HTMLButtonElement;
      const actual = element.disabled;
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Loading', () => {
    beforeEach(() => {
      loading = true;
    });

    it('shows the loading indicator.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZProfileReactivationForm-progress-loading');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('does not show the indicator if loading is false.', async () => {
      // Arrange
      loading = false;
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId('ZProfileReactivationForm-progress-loading');
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
