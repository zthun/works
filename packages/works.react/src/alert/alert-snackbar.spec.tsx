/* eslint-disable require-jsdoc */
import { act, render } from '@testing-library/react';
import React from 'react';
import { ZAlertBuilder } from './alert';
import { ZAlertSnackbar } from './alert-snackbar';
import { IZAlertStack, ZAlertStack, ZAlertStackContext } from './alert-stack.context';

describe('ZAlertSnackbar', () => {
  let alerts: IZAlertStack;

  function createTestTarget() {
    return render(
      <ZAlertStackContext.Provider value={alerts}>
        <ZAlertSnackbar></ZAlertSnackbar>
      </ZAlertStackContext.Provider>
    );
  }

  beforeEach(() => {
    alerts = new ZAlertStack();
  });

  it('should render the alerts.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    await act(async () => {
      alerts.add(new ZAlertBuilder().success().message('success').build());
      alerts.add(new ZAlertBuilder().error().message('error').build());
    });
    const actual = target.container.querySelectorAll('.ZAlertSnackbar-root .ZAlertStackList-alert');
    // Assert
    expect(actual.length).toEqual(2);
  });
});
