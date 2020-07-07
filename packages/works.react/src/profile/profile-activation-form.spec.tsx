import { render } from '@testing-library/react';
import React from 'react';
import { ZProfileActivationForm } from './profile-activation-form';

describe('ZProfileActivationForm', () => {
  async function createTestTarget() {
    return render(<ZProfileActivationForm />);
  }

  it('renders the form.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.findByTestId('ZProfileActivationForm-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
