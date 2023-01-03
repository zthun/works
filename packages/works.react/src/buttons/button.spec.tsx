/* eslint-disable require-jsdoc */

import { ZCircusBy } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React, { ReactNode } from 'react';
import { ZButton } from './button';
import { ZButtonComponentModel } from './button.cm';

describe('ZButton', () => {
  let avatar: ReactNode | undefined;
  let label: ReactNode | undefined;
  let loading: boolean | undefined;
  let disabled: boolean | undefined;
  let outline: boolean | undefined;
  let borderless: boolean | undefined;
  let name: string | undefined;
  let onClick: jest.Mock | undefined;

  async function createTestTarget() {
    const element = (
      <ZButton
        avatar={avatar}
        disabled={disabled}
        loading={loading}
        outline={outline}
        borderless={borderless}
        onClick={onClick}
        label={label}
        name={name}
      />
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return await ZCircusBy.first(driver, ZButtonComponentModel);
  }

  beforeEach(() => {
    avatar = undefined;
    loading = undefined;
    outline = undefined;
    label = undefined;
    name = undefined;
    onClick = undefined;
  });

  describe('Content', () => {
    it('should render the button content', async () => {
      // Arrange
      label = 'Test Button';
      const target = await createTestTarget();
      // Act
      const actual = await target.text();
      // Assert
      expect(actual).toEqual(label);
    });

    it('should name the button', async () => {
      // Arrange.
      name = 'button-name';
      const target = await createTestTarget();
      // Act.
      const actual = await target.name();
      // Assert.
      expect(actual).toEqual(name);
    });
  });

  describe('Click', () => {
    beforeEach(() => {
      onClick = jest.fn();
    });

    it('should raise the onClick event when the button is clicked.', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await target.click();
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
      const actual = await target.disabled();
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
      const actual = await target.loading();
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

  describe('Borderless', () => {
    async function assertBorderless(expected: boolean, _borderless: boolean) {
      // Arrange
      borderless = _borderless;
      const target = await createTestTarget();
      // Act.
      const actual = await target.borderless();
      // Assert
      expect(!!actual).toEqual(expected);
    }

    it('should keep the border if the borderless flag is false.', async () => {
      await assertBorderless(false, false);
    });

    it('should keep the border if the borderless flag is true.', async () => {
      await assertBorderless(true, true);
    });
  });

  describe('Outline', () => {
    async function assertOutline(expected: boolean, _outline: boolean | undefined) {
      // Arrange
      outline = _outline;
      const target = await createTestTarget();
      // Act
      const actual = await target.outlined();
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
