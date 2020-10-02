import { render } from '@testing-library/react';
import React from 'react';
import { ZFileSelectStatic } from '../file/file-select-static.class';
import { ZFileSelectContext } from '../file/file-select.context';
import { ZProfileAvatarForm } from './profile-avatar-form';

describe('ZProfileAvatarForm', () => {
  let file: File;

  async function createTestTarget() {
    return render(
      <ZFileSelectContext.Provider value={new ZFileSelectStatic(file)}>
        <ZProfileAvatarForm />
      </ZFileSelectContext.Provider>
    );
  }

  beforeEach(() => {
    file = new File([], 'test.png');
  });

  it('renders the form.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZProfileAvatarForm-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
