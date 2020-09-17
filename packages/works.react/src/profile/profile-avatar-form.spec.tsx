import { render } from '@testing-library/react';
import React from 'react';
import { ZProfileAvatarForm } from './profile-avatar-form';

describe('ZProfileAvatarForm', () => {
  async function createTestTarget() {
    return render(<ZProfileAvatarForm />);
  }

  it('renders the form.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZProfileAvatarForm-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
