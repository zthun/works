/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */

import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { ZButton } from './button';

describe('ZButton', () => {
  let avatar: ReactNode | undefined;
  let loading: boolean | undefined;
  let disabled: boolean | undefined;
  let outline: boolean | undefined;
  let onClick: jest.Mock | undefined;

  async function createTestTarget() {
    const target = render(
      <ZButton avatar={avatar} disabled={disabled} loading={loading} outline={outline} onClick={onClick}>
        <div className='ZButton-test-content'></div>
      </ZButton>
    );

    await waitFor(() => expect(target.container.querySelector('.ZButton-root')).toBeTruthy());

    return target;
  }

  beforeEach(() => {
    avatar = undefined;
    loading = undefined;
    outline = undefined;
    onClick = undefined;
  });

  describe('Content', () => {
    it('should render the button content', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.container.querySelector('.ZButton-test-content');
      // Assert
      expect(actual).not.toBeNull();
    });
  });

  describe('Click', () => {
    beforeEach(() => {
      onClick = jest.fn();
    });

    async function clickButton(target: RenderResult) {
      const button = target.container.querySelector('.ZButton-root');

      await act(async () => {
        fireEvent.click(button!);
      });
    }

    it('should raise the onClick event when the button is clicked.', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await clickButton(target);
      // Assert
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Disabled', () => {
    async function assertDisabled(expected: boolean, _disabled: boolean | undefined) {
      // Arrange
      disabled = _disabled;
      const target = await createTestTarget();
      // Act
      const input = target.container.querySelector<HTMLButtonElement>('.ZButton-root')!;
      const actual = input.disabled;
      // Assert
      expect(actual).toEqual(expected);
    }

    it('should disable the button when the disabled flag is true.', async () => {
      await assertDisabled(true, true);
    });

    it('should enable the button when the disabled flag is false.', async () => {
      await assertDisabled(false, false);
    });

    it('should enable the button when the disabled flag is undefined.', async () => {
      await assertDisabled(false, undefined);
    });
  });

  describe('Loading', () => {
    async function assertIsLoading(expected: boolean, _loading: boolean | undefined) {
      // Arrange
      loading = _loading;
      const target = await createTestTarget();
      // Act
      const actual = target.container.querySelector('.ZCircularProgress-root');
      // Assert
      expect(!!actual).toEqual(expected);
    }

    it('should render the loader when true.', async () => {
      await assertIsLoading(true, true);
    });

    it('should not render loader when false.', async () => {
      await assertIsLoading(false, false);
    });

    it('should not render the loader when undefined.', async () => {
      await assertIsLoading(false, undefined);
    });
  });

  describe('Color', () => {
    async function assertOutline(expected: boolean, _outline: boolean | undefined) {
      // Arrange
      outline = _outline;
      const target = await createTestTarget();
      // Act
      const actual = target.container.querySelector('.MuiButton-outlined');
      // Assert
      expect(!!actual).toEqual(expected);
    }

    it('should outline the button if the outline flag is true.', async () => {
      await assertOutline(true, true);
    });

    it('should contain the button if the outline flag is false.', async () => {
      await assertOutline(false, false);
    });

    it('should contain the button if the outline flag is undefined.', async () => {
      await assertOutline(false, undefined);
    });
  });
});
