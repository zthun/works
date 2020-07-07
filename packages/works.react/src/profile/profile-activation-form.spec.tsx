import { fireEvent, render } from '@testing-library/react';
import { IZProfileActivation, ZProfileActivationBuilder } from '@zthun/works.core';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { v4 } from 'uuid';
import { ZProfileActivationForm } from './profile-activation-form';

describe('ZProfileActivationForm', () => {
  let activation: IZProfileActivation;
  let onActivationChange: jest.Mock;

  async function createTestTarget() {
    return render(<ZProfileActivationForm activation={activation} onActivationChange={onActivationChange} />);
  }

  beforeEach(() => {
    activation = new ZProfileActivationBuilder().email('gambit@marvel.com').build();
    onActivationChange = jest.fn();
  });

  it('renders the form.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZProfileActivationForm-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should update the activation.', async () => {
    // Arrange
    const target = await createTestTarget();
    const expected = new ZProfileActivationBuilder().copy(activation).key(v4()).build();
    // Act
    await act(async () => {
      const field = target.getByTestId('ZProfileActivationForm-input-key').getElementsByTagName('input').item(0);
      field.value = expected.key;
      fireEvent.input(field);
    });
    const button = target.getByTestId('ZProfileActivationForm-btn-activate') as HTMLButtonElement;
    fireEvent.click(button);
    // Assert
    expect(onActivationChange).toHaveBeenCalledWith(expect.objectContaining(expected));
  });

  it('should update just the key if the activation is null.', async () => {
    // Arrange
    activation = null;
    const target = await createTestTarget();
    const expected = new ZProfileActivationBuilder().key(v4()).build();
    // Act
    await act(async () => {
      const field = target.getByTestId('ZProfileActivationForm-input-key').getElementsByTagName('input').item(0);
      field.value = expected.key;
      fireEvent.input(field);
    });
    const button = target.getByTestId('ZProfileActivationForm-btn-activate') as HTMLButtonElement;
    fireEvent.click(button);
    // Assert
    expect(onActivationChange).toHaveBeenCalledWith(expect.objectContaining(expected));
  });
});
