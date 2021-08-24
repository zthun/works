/* eslint-disable require-jsdoc */

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ZAlertStackList } from './alert-stack-list';
import { IZAlertStack, ZAlertStack, ZAlertStackContext } from './alert-stack.context';
import { ZAlertBuilder } from './alert';

describe('ZAlertStackList', () => {
  let stack: IZAlertStack;

  function createTestTarget() {
    return render(
      <ZAlertStackContext.Provider value={stack}>
        <ZAlertStackList />
      </ZAlertStackContext.Provider>
    );
  }

  beforeEach(() => {
    stack = new ZAlertStack();
  });

  describe('Modifications', () => {
    it('updates the list when the alert stack is changed.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      act(() => {
        stack.add(new ZAlertBuilder().success().message('Success alert').immortal().build());
        stack.add(new ZAlertBuilder().error().message('Error alert').immortal().build());
      });
      const actual = target.queryAllByTestId('ZAlertStackList-alert');
      // Assert
      expect(actual.length).toEqual(2);
    });
  });

  describe('Closing', () => {
    it('removes the specified alert when the close button is clicked.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      act(() => {
        stack.add(new ZAlertBuilder().success().message('Success alert').immortal().build());
        stack.add(new ZAlertBuilder().error().message('Error alert').immortal().build());
      });
      const alerts = target.getAllByTestId('ZAlertStackList-alert')[0];
      const closeButton = alerts.getElementsByTagName('button').item(0);
      act(() => {
        fireEvent.click(closeButton);
      });
      const actual = target.queryAllByTestId('ZAlertStackList-alert');
      // Assert
      expect(actual.length).toEqual(1);
    });
  });
});
