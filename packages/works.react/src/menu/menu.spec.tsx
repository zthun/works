/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { sleep } from '@zthun/works.core';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { ZMenu } from './menu';
import { ZMenuItem } from './menu-item';

describe('ZMenu', () => {
  let open: boolean | undefined;
  let onOpen: jest.Mock | undefined;
  let onClick: jest.Mock | undefined;

  async function createTestTarget() {
    const target = render(
      <ZMenu headerText='Menu Test' open={open} onOpen={onOpen}>
        <ZMenuItem className='test-menu-item' onClick={onClick}>
          Test Menu Item
        </ZMenuItem>
      </ZMenu>
    );

    await waitFor(() => expect(target.container.querySelector('.ZMenu-root')).toBeTruthy());
    return target;
  }

  beforeEach(() => {
    open = undefined;
    onOpen = undefined;
    onClick = undefined;
  });

  function getMenuPopup() {
    return document.querySelector<HTMLElement>('.ZMenu-item-list');
  }

  async function clickToggleButton(target: RenderResult) {
    const toggler = target.container.querySelector<HTMLButtonElement>('.ZMenu-toggle')!;

    await act(async () => {
      fireEvent.click(toggler);
    });
  }

  async function clickMenuItem() {
    const popup = getMenuPopup()!;
    const item = popup.querySelector('.test-menu-item')!;

    await act(async () => {
      fireEvent.click(item);
    });
  }

  describe('Open', () => {
    it('should open the menu when the button is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      await clickToggleButton(target);
      // Assert
      await waitFor(() => expect(getMenuPopup()).toBeTruthy());
    });

    it('should open the menu immediately if the open flag is passed by the props.', async () => {
      // Arrange
      open = true;
      // Act
      await createTestTarget();
      // Assert
      await waitFor(() => expect(getMenuPopup()).toBeTruthy());
    });

    it('should never open if the open flag is false and never changes.', async () => {
      // Arrange
      open = false;
      const target = await createTestTarget();
      // Act
      await clickToggleButton(target);
      await sleep(10);
      // Assert
      await waitFor(() => expect(getMenuPopup()).toBeFalsy());
    });

    it('should invoke the onOpen method.', async () => {
      // Arrange
      onOpen = jest.fn();
      const target = await createTestTarget();
      // Act
      await clickToggleButton(target);
      // Assert
      expect(onOpen).toHaveBeenCalledWith(true);
    });
  });

  describe('Items', () => {
    it('should invoke the onClick event when an item is clicked.', async () => {
      // Arrange
      onClick = jest.fn();
      const target = await createTestTarget();
      await clickToggleButton(target);
      // Act
      await clickMenuItem();
      // Assert
      expect(onClick).toHaveBeenCalled();
    });

    it('should close the menu when the menu is unmanaged and a menu item is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      await clickToggleButton(target);
      // Act
      await clickMenuItem();
      // Assert
      await waitFor(() => expect(getMenuPopup()).toBeFalsy());
    });
  });
});
